package controllers

import com.google.inject.Inject
import play.api.mvc._
import com.google.inject.{Guice, Injector}
import de.htwg.se.schwimmen.schwimmenModul
import de.htwg.se.schwimmen.controller.controllerComponent.ControllerInterface
import de.htwg.se.schwimmen.aUI.TUI
import play.api.libs.json.{JsValue, JsObject, Json, Writes}

import javax.inject._
/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  val injector: Injector = Guice.createInjector(new schwimmenModul)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])
  val tui = new TUI(controller)
  controller.createNewGame()

  def rulesPage(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.rules())
  }


  def game(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.game(this))
  }

  def setPlayerAmount(count: String) = {
    controller.setPlayerAmount(count.toInt)
  }

    def setPlayerName(name: String) = {
      controller.addPlayer(name)
    }


      def changeAllCards() = {
        controller.swapAllCards()
        controller.nextPlayer()
      }

      def knock() = {
        controller.setKnocked()
        controller.nextPlayer()
      }

      def changeOneCard(handCard: Int, fieldCard: Int) = {
        if (handCard != -1 && fieldCard != -1) {
          controller.swapCards(handCard, fieldCard)
          controller.nextPlayer()
        }
      }

      def setNextRound() = {
        controller.nextRound()
      }

      def undo() = {
        controller.undo()
      }

      def redo() = {
        controller.redo()
      }

      def saveGame() = {
        controller.saveTo("saveJson")
      }

      def loadGame() = {
        controller.loadFrom("loadJson")
      }

      def gameProcessComand(comand: String,  data: String): String = {
        if (comand.equals("\"all\"")) {
          changeAllCards()
        } else if (comand.equals("\"amount\"")) {
          setPlayerAmount(data.replace("\"", ""))
        } else if (comand.equals("\"addplayer\"")) {
          setPlayerName(data.replace("\"", ""))
        } else if (comand.equals("\"k\"")) {
          knock()
        } else if (comand.equals("\"nr\"")) {
          setNextRound()
        } else if (comand.equals("\"undo\"")) {
          undo()
        } else if (comand.equals("\"redo\"")) {
          redo()
        } else if (comand.equals("\"save\"")) {
          saveGame()
        } else if (comand.equals("\"load\"")) {
          loadGame()
        }
        "Ok"
      }

  case class Gamefield()
  implicit val gamefieldWrites: Writes[Gamefield] = new Writes[Gamefield] {
    def writes(gamefield: Gamefield): JsValue = Json.toJson(
      for {
        player <- 0 until controller.playerAmount
      } yield {
        Json.obj(
          "player_cards_1" -> controller.players(player).cardsOnHand.head,
          "player_cards_2" -> controller.players(player).cardsOnHand(1),
          "player_cards_3" -> controller.players(player).cardsOnHand.last,
          "field_card_1" -> controller.field.cardsOnField.head,
          "field_card_2" -> controller.field.cardsOnField(1),
          "field_card_3" -> controller.field.cardsOnField.last,
        )
      }
    )
  }

      def status = Action {
        Ok(Json.obj(
          "gamefield" -> Gamefield(),
          "game_status" -> tui.getGameState()
          )
        )
      }

      def gameRequest = Action {
        implicit request => {
          val req = request.body.asJson
          gameProcessComand(req.get("cmd").toString(), req.get("data").toString())
          println(req.get("data").toString())
          Ok(Json.obj(
            "gamefield" -> Gamefield(),
            "game_status" -> tui.getGameState()
            )
          )
        }
      }

      def allRoutes: String = {
        """
       GET  /
       GET  /command
    """
      }

}
