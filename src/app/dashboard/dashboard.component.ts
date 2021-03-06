import { Component, OnInit } from '@angular/core';
import { Typewritter } from '../typewritter';
import { error } from 'util';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // The base speed per character
    var time_setting = 30;
    // How much to 'sway' (random * this-many-milliseconds)
    var random_setting = 100;
    // The text to use NB use \n not real life line breaks!
    var input_text = "How fast can you type?";
    // Where to fill up
    var target_setting = $("#output");
    // Launch that function!
    type(input_text, target_setting, 0, time_setting, random_setting);

    function type(input, target, current, time, random) {
      // If the current count is larger than the length of the string, then for goodness sake, stop
      if (current > input.length) {
        // Write Complete
        console.log("Complete.");
      }
      else {
        // console.log(current)
        // Increment the marker
        current += 1;
        // fill the target with a substring, from the 0th character to the current one
        target.text(input.substring(0, current));
        // Wait ...
        setTimeout(function () {
          // do the function again, with the newly incremented marker
          type(input, target, current, time, random);
          // Time it the normal time, plus a random amount of sway
        }, time + Math.random() * random);
      }
    }


    /*
     * The typing test stuff
     */

    var character_length = 31;
    var index = 0;
    var letters = $("#input_text").val();
    var started = false;
    var current_string = letters.substring(index, index + character_length);

    var timer = 0;
    var wpm = 0;
    var errors = 0;
    var interval_timer;

    var wordcount = 0;

    $("html, body").click(function () {
      $("#textarea").focus();
    });

    $("#target").text(current_string);
    $(window).keypress(function (evt) {
      if (!started) {
        _start();
        started = true;
      }
      evt = evt || window.event;
      var charCode = evt.which || evt.keyCode;
      var charTyped = String.fromCharCode(charCode);
      if (charTyped == letters.charAt(index)) {
        if (charTyped == " ") {
          wordcount++;
          $("#wordcount").text(wordcount);
        }
        index++;
        current_string = letters.substring(index, index + character_length);
        $("#target").text(current_string);
        $("#your-attempt").append(charTyped);
        if (index == letters.length) {
          wordcount++;
          $("#wordcount").text(wordcount);
          $("#timer").text(timer);
          if (timer == 0) {
            timer = 1;
          }
          wpm = Math.round(wordcount / (timer / 60));
          $("#wpm").text(wpm);
          _stop();
          _finished();
        }
      } else {
        $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
        errors++;
        console.log(errors);
        $("#errors").text(errors);
      }
    });

    $("#reset").click(function () {
      _reset();
    });

    $("#change").click(function () {
      $("#input_text").show().focus();
    });

    $("#pause").click(function () {
      _stop();
    });

    $("#input_text").change(function () {
      _reset();
    });

    //Start the timer
    var _start = function () {
      interval_timer = setInterval(function () {
        timer++;
        $("#timer").text(timer);
        wpm = Math.round(wordcount / (timer / 60));
        $("#wpm").text(wpm);
      }, 1000)
    }

    //Stop timer
    var _stop = function () {
      clearInterval(interval_timer);
      started = false;
    }

    //Reset the stats
    var _reset = function () {
      $("#input_text").blur().hide();;
      $("#your-attempt").text("");
      index = 0;
      errors = 0;
      clearInterval(interval_timer);
      started = false;
      letters = $("#input_text").val();
      $("#wpm").text("0");
      $("#timer").text("0");
      $("#wordcount").text("0");
      timer = 0;
      wpm = 0;
      current_string = letters.substring(index, index + character_length);
      $("#target").text(current_string);
    }

    //Show the message on finished.
    var _finished = function () {
      alert("Congratulations!\nWords per minute: " + wpm + "\nWordcount: " + wordcount + "\nErrors:" + errors);
    }

    var window_focus;

    $(window).focus(function () {
      window_focus = true;
    }).blur(function () {
      window_focus = false;
    });

    $(document).ready(function () {
      if (window_focus) {
        $("#focus").hide();
      }
      $(window).focus(function () {
        $("#focus").hide();
      });
    });

  }
}
