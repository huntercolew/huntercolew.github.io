#define X_PIN A0
#define Y_PIN A1
#define SW_PIN A2
#include <Arduino_JSON.h>
#include <ezButton.h>
#include <LiquidCrystal.h>

ezButton button(SW_PIN);

int Contrast=75;
 LiquidCrystal lcd(12, 11, 5, 4, 3, 2);  

double xVal = 0;
double yVal = 0;
int swVal = 0;
bool sw = false;

int codeArray[4];
int currCode;

JSONVar serialOutput;
bool active = false;

void setup() {
  // initialize serial communications at 9600 bps
  Serial.begin(9600);
  analogWrite(6,Contrast);
  lcd.begin(16, 2);
}

void loop() {



  if (Serial.available() > 0) {

    // score = Serial.parseInt();
    // if(score>prevScore)
    //   prevScore = score;
    // lcd.print(String(prevScore));

     String jsonString = Serial.readStringUntil("\n");
      JSONVar serialInput = JSON.parse(jsonString);

      if (JSON.typeof(serialInput) == "undefined") {
        Serial.println("JSON parsing failed!");
      } else {
        active = (bool) serialInput["active"];
        codeArray[0] = serialInput["code1"];
        codeArray[1] = serialInput["code2"];
        codeArray[2] = serialInput["code3"];
        currCode = serialInput["currCode"];
      }
  }


  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Codes:");
  

  for (int i = 0; i < currCode; i++){
    lcd.setCursor(3*i, 1);
    lcd.print(codeArray[i]);
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
  Serial.print("{\"x\":" + String(map(xVal, 0, 1023, -100, 100)) + ",\"y\":" + String(map(yVal, 0, 1023, -5, 5)) + ",\"switch\":" + String(sw) + "}\n");

  // wait 1 milliseconds before the next loop
  delay(1);
}
