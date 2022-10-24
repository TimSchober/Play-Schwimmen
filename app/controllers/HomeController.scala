package controllers

import com.google.inject.Inject
import play.api.mvc._
import com.google.inject.{Guice, Injector}
import de.htwg.se.schwimmen.schwimmenModul
import de.htwg.se.schwimmen.controller.controllerComponent.ControllerInterface
import de.htwg.se.schwimmen.aUI.TUI
import de.htwg.se.schwimmen.controller.controllerComponent.NewGame

import javax.inject._
import scala.util.{Failure, Success, Try}
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

  def index(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(tui.getGameState())
  }

  /**
   * Puts tile of given color in specified slot
   * @param input input as String
   * @return
   */
  def put(input: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    tui.input = input
    Ok(tui.processInput())
  }
}
