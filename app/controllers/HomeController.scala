package controllers

import com.google.inject.Inject
import play.api.mvc._
import com.google.inject.{Guice, Injector}
import de.htwg.se.schwimmen.schwimmenModul
import de.htwg.se.schwimmen.controller.controllerComponent.ControllerInterface
import de.htwg.se.schwimmen.aUI.TUI

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

  /**
   * Puts tile of given color in specified slot
   * @param input input as String
   * @return
   */
  def setPlayerAmount(count: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    //controller.setPlayerAmount(count.toInt)
    Redirect("/playerCount")
    tui.input = count
    tui.processInput()
    Ok(views.html.game(this))
  }

  def setPlayerName(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Redirect("/playerName")
    tui.input = name
    tui.processInput()
    Ok(views.html.game(this))
  }
}
