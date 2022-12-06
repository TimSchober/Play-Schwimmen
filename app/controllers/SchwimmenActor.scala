package controllers

import akka.actor.{Actor, ActorRef}
import de.htwg.se.schwimmen.controller.controllerComponent.controllerImpl.Controller

import scala.swing.Reactor

class SchwimmenActor(out: ActorRef, controller: Controller) extends Actor with Reactor {

  listenTo(controller)

  def receive = {
    case msg: String =>
      out ! (controller.toString)
      println("Sent Json to Client"+ msg)
  }

  def sendJsonToClient = {
    println("Received event from Controller")
    out ! (controller.toString)
  }
}


