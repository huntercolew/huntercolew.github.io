#define X_PIN A0
#define Y_PIN A1
#define SW_PIN A2
#include <Arduino_JSON.h>
#include <ezButton.h>
#include <LiquidCrystal.h>

ezButton button(SW_PIN);

int Contrast=75;
 LiquidCrystal lcd(12, 11, 5, 4, 3, 2);  

// const int ledPin = 10;	// creating the object 'led' on pin D10
// int ledState = LOW;

// const int buzzPin = 9;
// int buzzState = LOW;
int score = 0;

double xVal = 0;
double yVal = 0;
int swVal = 0;
bool sw = false;


JSONVar serialOutput;
bool active = false;

void setup() {
  // initialize serial communications at 9600 bps
  Serial.begin(9600);
  //pinMode(ledPin, OUTPUT);
  analogWrite(6,Contrast);
  lcd.begin(16, 2);
}

void loop() {

  lcd.setCursor(0, 0);
  lcd.print("Score:");
   
  lcd.setCursor(0, 1);
  //lcd.print("Subscribe");

  if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil("\n");
    if (jsonString != '\n') {
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        active = (bool) serialInput["active"];
        score = (int) serialInput["score"];
        lcd.print(String(score));
        //ledState = serialInput["toggleLED"] ? !ledState : ledState;
        //digitalWrite(ledPin, ledState);
        //buzzState = serialInput["buzz"];
        //digitalWrite(buzzPin, ledState);
      }
    }
  }

  button.loop();

  // read the joystick's value:
  xVal = analogRead(X_PIN);
  yVal = analogRead(Y_PIN);
  swVal = analogRead(SW_PIN);
  
  if(button.isReleased()){
    sw = !sw;
  }

  // print the results to the serial monitor:
  
  // Serial.print("{\"x\":" + String(map(xVal, 0, 1023, 0, 600)) + ",\"y\":" + String(map(yVal, 0, 1023, 0, 600)) + "}\n");
  Serial.print("{\"x\":" + String(map(xVal, 0, 1023, 0, 600)) + ",\"y\":" + String(map(yVal, 0, 1023, 0, 600)) + ",\"switch\":" + String(sw) + "}\n");

  // wait 1 milliseconds before the next loop
  delay(1);
}
