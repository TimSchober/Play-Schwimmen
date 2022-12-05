package controllers

import com.google.inject.Inject
import play.api.mvc._
import com.google.inject.{Guice, Injector}
import de.htwg.se.schwimmen.schwimmenModul
import de.htwg.se.schwimmen.controller.controllerComponent.ControllerInterface
import de.htwg.se.schwimmen.aUI.TUI
import play.api.libs.json.{JsObject, JsValue, Json, Writes}

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

  def setPlayerAmount(count: String): Unit = {
    controller.setPlayerAmount(count.toInt)
  }

  def setPlayerName(name: String): Unit = {
    controller.addPlayer(name)
  }

  def changeAllCards(): Unit = {
    controller.swapAllCards()
    controller.nextPlayer()
  }

  def knock(): Unit = {
    controller.setKnocked()
    controller.nextPlayer()
  }

      def changeOneCard(cards: String) = {
        var handCard = cards.split("G").head.toInt
        var fieldCard = cards.split("G").last.toInt
        if (handCard != -1 && fieldCard != -1) {
          println(handCard)
          print(fieldCard)
          controller.swapCards(handCard, fieldCard)
          controller.nextPlayer()
        }
      }

  def setNextRound(): Unit = {
    controller.nextRound()
  }

  def undo(): Unit = {
    controller.undo()
  }

  def redo(): Unit = {
    controller.redo()
  }

  def saveGame(): Unit = {
    controller.saveTo("saveJson")
  }

  def loadGame(): Unit = {
    controller.loadFrom("loadJson")
  }

      def gameProcessComand(comand: String,  data: String): String = {
        if (comand.equals("\"all\"")) {
          changeAllCards()
        } else if (comand.equals("\"y\"")) {
          changeOneCard(data.replace("\"", ""))
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
      Json.obj(
        "player_cards" -> controller.players.head.cardsOnHand,
        "field_cards" -> controller.field.cardsOnField,
      )
    )
  }

  case class PlayerAmount()
  implicit val playeramountwrites: Writes[PlayerAmount] = new Writes[PlayerAmount] {
    def writes(playerAmount: PlayerAmount): JsValue = Json.toJson(
      Json.obj(
        "player_Amount" -> controller.playerAmount
      )
    )
  }

  case class PlayerName()
  implicit val playernamewrites: Writes[PlayerName] = new Writes[PlayerName] {
    def writes(playerName: PlayerName): JsValue = Json.toJson(
      Json.obj(
        "player_name" -> controller.players.head.name
      )
    )
  }

      def status = Action {
        if (tui.getGameState().equals("Player 1, type your name:")) {
          Ok(Json.obj(
            "player_amount" -> PlayerAmount(),
            "getGameState" -> tui.getGameState(),
            "player_name" -> PlayerName()
          )
          )
        } else if (tui.getGameState().contains("its your turn")) {
          Ok(Json.obj(
            "player_amount" -> PlayerAmount(),
            "getGameState" -> tui.getGameState(),
            "player_name" -> PlayerName(),
            "gamecards" -> Gamefield()
          )
          )
        } else {
          Ok(Json.obj(
            "player_amount" -> PlayerAmount(),
            "getGameState" -> tui.getGameState()
            )
          )
        }
      }

      def gameRequest = Action {
        implicit request => {
          val req = request.body.asJson
          gameProcessComand(req.get("cmd").toString(), req.get("data").toString())
          if (tui.getGameState().equals("Player 1, type your name:")) {
            Ok(Json.obj(
              "player_amount" -> PlayerAmount(),
              "getGameState" -> tui.getGameState(),
              "player_name" -> PlayerName()
              )
            )

          } else if (tui.getGameState().contains("its your turn")) {
            println(tui.getGameState())
            Ok(Json.obj(
              "player_amount" -> PlayerAmount(),
              "getGameState" -> tui.getGameState(),
              "player_name" -> PlayerName(),
              "gamecards" -> Gamefield()
            )
            )
          }
          else {
            Ok(Json.obj(
              "player_amount" -> PlayerAmount(),
              "getGameState" -> tui.getGameState(),
            )
            )
          }
        }
      }

  def allRoutes: String = {
  """
   GET  /
   GET  /command
  """
  }

}
