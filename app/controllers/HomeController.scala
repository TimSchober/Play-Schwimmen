package controllers

import akka.actor._
import akka.stream.Materializer
import com.google.inject.Inject
import play.api.mvc._
import com.google.inject.{Guice, Injector}
import de.htwg.se.schwimmen.schwimmenModul
import de.htwg.se.schwimmen.controller.controllerComponent.{CardSelected, ControllerInterface, NewGame, PlayerAdded, PlayerAmountChanged, PlayerChanged, YesSelected}
import de.htwg.se.schwimmen.model.fieldComponent.PlayerInterface
// import de.htwg.se.schwimmen.aUI.TUI
import de.htwg.se.schwimmen.model.EasyStrategy
import play.api.libs.json._
import play.api.libs.streams.ActorFlow

import javax.inject._
import scala.swing.Reactor

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends BaseController {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  private val injector: Injector = Guice.createInjector(new schwimmenModul)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])
  // var tui = new TUI(controller)
  val strat = new EasyStrategy

  def rulesPage(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.rules())
  }


  def game(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.game(this))
  }

  def status = Action {
    Ok(Json.obj(
      //"player_amount" -> controller.playerAmount,
      "game_state" -> GameState()
      //"player_name" -> PlayerName(),
      //"game_cards" -> Gamefield()
      )
    )
  }

  private def createNewGame(): Unit = {
    controller.createNewGame()
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

  def changeOneCard(cards: String): Unit = {
    val handCard = cards.split("G").head.toInt
    val fieldCard = cards.split("G").last.toInt
    if (handCard != -1 && fieldCard != -1) {
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

  //---

  private def gameProcessComand(command: String, data: String): String = {
    if (command.equals("\"all\"")) {
      changeAllCards()
    } else if (command.equals("\"y\"")) {
      changeOneCard(data.replace("\"", ""))
    } else if (command.equals("\"amount\"")) {
      setPlayerAmount(data.replace("\"", ""))
    } else if (command.equals("\"addplayer\"")) {
      setPlayerName(data.replace("\"", ""))
    } else if (command.equals("\"k\"")) {
      knock()
    } else if (command.equals("\"nr\"")) {
      setNextRound()
    } else if (command.equals("\"undo\"")) {
      undo()
    } else if (command.equals("\"redo\"")) {
      redo()
    } else if (command.equals("\"save\"")) {
      saveGame()
    } else if (command.equals("\"load\"")) {
      loadGame()
    }
    "Ok"
  }

  case class Gamefield()
  implicit val gamefieldWrites: Writes[Gamefield] = new Writes[Gamefield] {
    def writes(gamefield: Gamefield): JsValue = {
      if (controller.players.isEmpty) {
        Json.toJson(
          Json.obj(
            "player_cards" -> "None",
            "field_cards" -> controller.field.cardsOnField,
          )
        )
      } else {
        Json.toJson(
          Json.obj(
            "player_cards" -> controller.players.head.cardsOnHand,
            "field_cards" -> controller.field.cardsOnField,
          )
        )
      }
    }
  }

  case class PlayerName()
  implicit val playernamewrites: Writes[PlayerName] = new Writes[PlayerName] {
    def writes(playerName: PlayerName): JsValue = {
      if (controller.players.isEmpty) {
        Json.toJson(
          Json.obj(
            "player_name" -> "None"
          )
        )
      } else {
        Json.toJson(
          Json.obj(
            "player_name" -> controller.players.head.name
          )
        )
      }
    }
  }

  case class GameState()
  implicit val gamestatewrites: Writes[GameState] = new Writes[GameState] {
    def writes(playerName: GameState): JsValue = {
      if (controller.playerAmount == 0) {
        Json.toJson(
          Json.obj(
            "game_state" -> "no_player_amount"
          )
        )
      } else if (controller.playerAmount > controller.players.size) {
        Json.toJson(
          Json.obj(
            "game_state" -> "not_enough_players"
          )
        )
      } else if (controller.players.head.hasKnocked || strat.checkStop(controller.players.last)) {
        val res = controller.players.sortBy(_.cardCount).reverse
        var looseList: List[PlayerInterface] = Nil
        for (pl <- res) if (pl.cardCount == res.last.cardCount) looseList = looseList.::(pl)
        controller.players = res.dropRight(looseList.size)
        for (pl <- looseList) {
          if (pl.life - 1 == -1) {
            controller.playerAmount = controller.playerAmount - 1
          } else
            controller.players = controller.players.::(pl.setLife(pl.life - 1))
        }
        if (controller.playerAmount == 1) {
          System.exit(0)
        }
        Json.toJson(
          Json.obj(
            "game_state" -> "game_ended"
          )
        )
      } else {
        Json.toJson(
          Json.obj(
            "game_state" -> "game_running"
          )
        )
      }
    }
  }

  def socket: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      SchwimmenWebSocketActorFactory.create(out)
    }
  }

  object SchwimmenWebSocketActorFactory {
    def create(out: ActorRef): Props = {
      Props(new SchwimmenActor(out))
    }
  }

  private def get_json_obj_as_str(): String = {
    Json.obj(
      "player_amount" -> controller.playerAmount,
      "game_state" -> GameState(),
      "player_name" -> PlayerName(),
      "game_cards" -> Gamefield()
    ).toString()
  }

  class SchwimmenActor(out: ActorRef) extends Actor with Reactor {

    listenTo(controller)

    def receive: Receive = {
      case msg: String =>
        // val json = Json.toJson(msg)
        if (msg.isEmpty) {
          println("empty message")
        } else if (msg == "opening connection") {
          createNewGame()
          println("opening message")
        } else {
          val json: JsValue = Json.parse(msg)
          println(msg)
          gameProcessComand(json("cmd").toString(), json("data").toString())
//          out ! msg
//          println("Send something to Client " + msg)
        }
    }

    reactions += {
      case event: NewGame => sendJsonToClient
      case event: PlayerAmountChanged => sendJsonToClient
      case event: PlayerAdded => sendJsonToClient
      case event: YesSelected => sendJsonToClient
      case event: CardSelected => sendJsonToClient
      case event: PlayerChanged => sendJsonToClient
    }

    def sendJsonToClient:Unit = {
      println("Received event from Controller")
      out ! get_json_obj_as_str()
    }
  }
}


