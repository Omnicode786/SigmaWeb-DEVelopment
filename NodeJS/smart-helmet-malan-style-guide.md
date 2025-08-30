# Smart Helmet Sensor Guide - David Malan Style with Code Examples

## Welcome to Smart Helmet Engineering!

So, you want to build a smart helmet? Well, let's dive right in! Think of this as CS50 for embedded systems. We're going to walk through each sensor, understand exactly what it does, how it talks to your ESP32, and most importantly - how to write the code that brings it all to life.

---

## 1. **ESP32 DevKit - The Brain of Your Operation**

Let me ask you this: what makes a computer a computer? It's the ability to take input, process it, and produce output. Your ESP32? It's essentially a tiny computer with superpowers - built-in Wi-Fi, Bluetooth, and more processing power than the computers that got us to the moon!

### Why ESP32? Let's Be Precise About This

The ESP32 isn't just another microcontroller. It's a **dual-core 32-bit processor** running at **240MHz** with **512KB of RAM**. But here's what makes it perfect for your helmet: it has **built-in wireless capabilities**. No need for separate Wi-Fi modules, Bluetooth adapters, or complex networking libraries. It's all there, ready to go.

### Pin Configuration - Every Wire Has a Purpose

```cpp
// Pin definitions for our Smart Helmet
// Think of these as the "address" for each component
#define MPU6050_SDA_PIN    21    // I2C Data line
#define MPU6050_SCL_PIN    22    // I2C Clock line
#define GPS_RX_PIN         16    // Connect to GPS TX
#define GPS_TX_PIN         17    // Connect to GPS RX
#define GSM_RX_PIN         25    // Connect to GSM TX
#define GSM_TX_PIN         26    // Connect to GSM RX
#define BUZZER_PIN         12    // PWM output for buzzer
#define BUTTON_PIN         13    // Cancel button input
#define LED_STATUS_PIN     2     // Status LED
#define BATTERY_MONITOR    36    // ADC pin for battery voltage
```

### Basic ESP32 Setup - Your First Lines of Code

```cpp
#include <WiFi.h>
#include <BluetoothSerial.h>

// Global variables - think of these as your program's memory
BluetoothSerial SerialBT;
const char* ssid = "YourWiFiName";
const char* password = "YourWiFiPassword";

void setup() {
  // This runs once when the ESP32 starts up
  Serial.begin(115200);  // Start serial communication at 115200 bps
  
  // Initialize Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi connected!");
  
  // Initialize Bluetooth
  SerialBT.begin("SmartHelmet_Device");
  Serial.println("Bluetooth ready for pairing");
  
  // Setup GPIO pins
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);  // Internal pull-up resistor
  pinMode(LED_STATUS_PIN, OUTPUT);
  
  Serial.println("Smart Helmet System Initialized!");
}

void loop() {
  // This runs continuously - like an infinite while loop
  // Your main program logic will go here
  
  // Blink LED to show we're alive
  digitalWrite(LED_STATUS_PIN, HIGH);
  delay(100);
  digitalWrite(LED_STATUS_PIN, LOW);
  delay(900);
}
```

### Power Management - Because Battery Life Matters

```cpp
#include "esp_sleep.h"

void enterDeepSleep(int seconds) {
  Serial.println("Going to sleep...");
  esp_sleep_enable_timer_wakeup(seconds * 1000000ULL);  // Convert to microseconds
  esp_deep_sleep_start();
}

void configureSleepWakeup() {
  // Wake up on button press
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_13, 0);  // Wake when button pressed (LOW)
}
```

---

## 2. **MPU-6050 - Your Crash Detection Superhero**

Now, here's where things get really interesting. The MPU-6050 isn't just a sensor - it's like having a tiny physicist inside your helmet, constantly measuring how fast things are moving and rotating.

### Understanding the Physics - Because Science Matters

Think about what happens in a crash:
1. **Normal riding**: Smooth acceleration changes, gentle turns
2. **Crash scenario**: SUDDEN acceleration spike (>3g) + rapid rotation (>250°/s)

The MPU-6050 measures both of these simultaneously, 100+ times per second!

### MPU-6050 Code - Let's Read Some Physics

```cpp
#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  
  // Initialize MPU6050
  Serial.println("Initializing MPU6050...");
  if (!mpu.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G)) {
    Serial.println("Could not find MPU6050 sensor!");
    while(1);  // Stop here if sensor not found
  }
  
  // Calibrate the gyroscope - this is important!
  Serial.println("Calibrating gyroscope... keep helmet still!");
  mpu.calibrateGyro();
  Serial.println("MPU6050 ready!");
}

void loop() {
  // Read sensor data
  Vector rawAccel = mpu.readRawAccel();
  Vector normAccel = mpu.readNormalizeAccel();  // In 'g' units
  Vector normGyro = mpu.readNormalizeGyro();    // In degrees/second
  
  // Display the data
  Serial.print("Accel X: "); Serial.print(normAccel.XAxis);
  Serial.print(" Y: "); Serial.print(normAccel.YAxis);
  Serial.print(" Z: "); Serial.println(normAccel.ZAxis);
  
  Serial.print("Gyro X: "); Serial.print(normGyro.XAxis);
  Serial.print(" Y: "); Serial.print(normGyro.YAxis);
  Serial.print(" Z: "); Serial.println(normGyro.ZAxis);
  
  // Check for crash conditions
  if (detectCrash(normAccel, normGyro)) {
    Serial.println("CRASH DETECTED!");
    // Trigger emergency response
  }
  
  delay(100);  // Sample at 10Hz
}

bool detectCrash(Vector accel, Vector gyro) {
  // Calculate total acceleration magnitude
  float totalAccel = sqrt(accel.XAxis*accel.XAxis + 
                         accel.YAxis*accel.YAxis + 
                         accel.ZAxis*accel.ZAxis);
  
  // Calculate total gyroscopic motion
  float totalGyro = sqrt(gyro.XAxis*gyro.XAxis + 
                        gyro.YAxis*gyro.YAxis + 
                        gyro.ZAxis*gyro.ZAxis);
  
  // Crash thresholds based on real-world testing
  const float ACCEL_THRESHOLD = 3.0;    // 3g acceleration
  const float GYRO_THRESHOLD = 250.0;   // 250 degrees per second
  
  return (totalAccel > ACCEL_THRESHOLD || totalGyro > GYRO_THRESHOLD);
}
```

### Advanced Crash Detection - Because False Alarms Are Bad

```cpp
#define SAMPLE_SIZE 10
float accelBuffer[SAMPLE_SIZE];
int bufferIndex = 0;
bool bufferFull = false;

bool smartCrashDetection() {
  Vector accel = mpu.readNormalizeAccel();
  
  // Calculate acceleration magnitude
  float magnitude = sqrt(accel.XAxis*accel.XAxis + 
                        accel.YAxis*accel.YAxis + 
                        accel.ZAxis*accel.ZAxis);
  
  // Add to circular buffer (like a sliding window)
  accelBuffer[bufferIndex] = magnitude;
  bufferIndex = (bufferIndex + 1) % SAMPLE_SIZE;
  if (bufferIndex == 0) bufferFull = true;
  
  if (!bufferFull) return false;
  
  // Analyze pattern over time window
  float maxVal = 0, minVal = 100;
  for (int i = 0; i < SAMPLE_SIZE; i++) {
    if (accelBuffer[i] > maxVal) maxVal = accelBuffer[i];
    if (accelBuffer[i] < minVal) minVal = accelBuffer[i];
  }
  
  // Look for sudden spike pattern
  float changeRate = maxVal - minVal;
  return (changeRate > 2.5);  // Sudden 2.5g change indicates impact
}
```

---

## 3. **NEO-6M GPS Module - Your Digital Compass**

GPS is essentially magic, isn't it? Satellites 20,000 kilometers above your head telling you exactly where you are on Earth. But for our helmet, GPS is the difference between "someone crashed somewhere" and "someone crashed at 34.0522° N, 118.2437° W - send help here!"

### GPS Fundamentals - Space-Based Positioning

The NEO-6M talks to us using **NMEA sentences** - standardized text messages that contain all the location data. Think of them as very structured telegrams from space.

### GPS Code - Parsing Space Messages

```cpp
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

TinyGPSPlus gps;
SoftwareSerial gpsSerial(16, 17);  // RX, TX pins

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600);
  Serial.println("GPS Module Test Starting...");
}

void loop() {
  // Read data from GPS module
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      displayGPSInfo();
    }
  }
  
  // Check if no data received for 5 seconds
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println("No GPS detected - check wiring!");
  }
}

void displayGPSInfo() {
  if (gps.location.isValid()) {
    Serial.print("Latitude: ");
    Serial.println(gps.location.lat(), 6);  // 6 decimal places for accuracy
    Serial.print("Longitude: ");
    Serial.println(gps.location.lng(), 6);
    
    if (gps.altitude.isValid()) {
      Serial.print("Altitude: ");
      Serial.println(gps.altitude.meters());
    }
    
    if (gps.speed.isValid()) {
      Serial.print("Speed: ");
      Serial.println(gps.speed.kmph());
    }
    
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
  } else {
    Serial.println("Location: INVALID");
  }
}
```

### GPS Emergency Functions - Because Every Second Counts

```cpp
struct GPSData {
  double latitude;
  double longitude;
  double altitude;
  double speed;
  bool isValid;
  String timestamp;
};

GPSData getCurrentLocation() {
  GPSData data;
  
  if (gps.location.isValid()) {
    data.latitude = gps.location.lat();
    data.longitude = gps.location.lng();
    data.altitude = gps.altitude.meters();
    data.speed = gps.speed.kmph();
    data.isValid = true;
    
    // Format timestamp
    if (gps.date.isValid() && gps.time.isValid()) {
      data.timestamp = String(gps.date.year()) + "-" + 
                      String(gps.date.month()) + "-" + 
                      String(gps.date.day()) + " " +
                      String(gps.time.hour()) + ":" + 
                      String(gps.time.minute()) + ":" + 
                      String(gps.time.second());
    }
  } else {
    data.isValid = false;
    Serial.println("GPS data not valid yet...");
  }
  
  return data;
}

String generateGoogleMapsLink(double lat, double lng) {
  // Create clickable Google Maps link
  return "https://maps.google.com/?q=" + 
         String(lat, 6) + "," + String(lng, 6);
}

void waitForGPSFix() {
  Serial.println("Waiting for GPS fix...");
  unsigned long startTime = millis();
  
  while (!gps.location.isValid()) {
    while (gpsSerial.available() > 0) {
      gps.encode(gpsSerial.read());
    }
    
    if (millis() - startTime > 60000) {  // 60 second timeout
      Serial.println("GPS fix timeout!");
      break;
    }
    
    Serial.print("Satellites: ");
    Serial.println(gps.satellites.value());
    delay(1000);
  }
  
  if (gps.location.isValid()) {
    Serial.println("GPS fix acquired!");
  }
}
```

---

## 4. **Battery Monitoring - Power is Everything**

Here's a fundamental truth: a dead helmet can't save anyone. Battery monitoring isn't just nice to have - it's absolutely critical. We need to know when to charge, when to conserve power, and when to panic because we're about to lose power.

### Battery Voltage Monitoring - Math in Action

```cpp
// Voltage divider configuration: 100kΩ + 33kΩ resistors
#define BATTERY_PIN 36
#define R1 100000.0  // 100kΩ resistor
#define R2 33000.0   // 33kΩ resistor
#define REF_VOLTAGE 3.3

float readBatteryVoltage() {
  // Read ADC value (0-4095 for 12-bit ADC)
  int rawValue = analogRead(BATTERY_PIN);
  
  // Convert to voltage (0-3.3V range)
  float voltage = (rawValue / 4095.0) * REF_VOLTAGE;
  
  // Calculate actual battery voltage using voltage divider formula
  float batteryVoltage = voltage * ((R1 + R2) / R2);
  
  return batteryVoltage;
}

int getBatteryPercentage() {
  float voltage = readBatteryVoltage();
  
  // Li-ion battery voltage range: 3.0V (empty) to 4.2V (full)
  if (voltage >= 4.2) return 100;
  if (voltage <= 3.0) return 0;
  
  // Linear interpolation between 3.0V and 4.2V
  return (int)((voltage - 3.0) / (4.2 - 3.0) * 100);
}

void displayBatteryStatus() {
  float voltage = readBatteryVoltage();
  int percentage = getBatteryPercentage();
  
  Serial.print("Battery: ");
  Serial.print(voltage, 2);
  Serial.print("V (");
  Serial.print(percentage);
  Serial.println("%)");
  
  // Warning levels
  if (percentage < 20) {
    Serial.println("WARNING: Low battery!");
  } else if (percentage < 10) {
    Serial.println("CRITICAL: Very low battery!");
  }
}
```

### Advanced Battery Management

```cpp
// Battery monitoring with hysteresis to prevent flickering readings
float lastBatteryReading = 0;
unsigned long lastBatteryCheck = 0;
const unsigned long BATTERY_CHECK_INTERVAL = 10000;  // Check every 10 seconds

void updateBatteryStatus() {
  if (millis() - lastBatteryCheck > BATTERY_CHECK_INTERVAL) {
    float currentVoltage = readBatteryVoltage();
    
    // Use hysteresis to smooth readings
    if (abs(currentVoltage - lastBatteryReading) > 0.1) {
      lastBatteryReading = currentVoltage;
      displayBatteryStatus();
      
      // Send low battery alert if needed
      if (getBatteryPercentage() < 15) {
        sendLowBatteryAlert();
      }
    }
    
    lastBatteryCheck = millis();
  }
}

void sendLowBatteryAlert() {
  Serial.println("Sending low battery notification...");
  // Send notification to app/contacts
  // This would integrate with your communication system
}
```

---

## 5. **SIM800L GSM Module - Your Cellular Lifeline**

When Wi-Fi fails, when you're in the middle of nowhere, when everything else goes wrong - this little GSM module is your lifeline to the outside world. It speaks the language of cell towers, sending SMS messages that could literally save your life.

### GSM Communication - AT Commands Explained

```cpp
#include <SoftwareSerial.h>

SoftwareSerial gsm(25, 26);  // RX, TX

void setup() {
  Serial.begin(115200);
  gsm.begin(9600);
  
  Serial.println("Initializing GSM module...");
  delay(1000);
  
  // Test basic communication
  sendATCommand("AT", 1000);
  
  // Set SMS text mode
  sendATCommand("AT+CMGF=1", 1000);
  
  // Check network registration
  sendATCommand("AT+CREG?", 1000);
  
  Serial.println("GSM module initialized");
}

void loop() {
  // Handle any incoming data from GSM module
  if (gsm.available()) {
    String response = gsm.readString();
    Serial.print("GSM: ");
    Serial.println(response);
  }
  
  // Handle commands from Serial Monitor
  if (Serial.available()) {
    String command = Serial.readString();
    gsm.println(command);
  }
}

bool sendATCommand(String command, int timeout) {
  gsm.println(command);
  long int time = millis();
  String response = "";
  
  while((time + timeout) > millis()) {
    while(gsm.available()) {
      char c = gsm.read();
      response += c;
    }
  }
  
  Serial.print("Command: ");
  Serial.println(command);
  Serial.print("Response: ");
  Serial.println(response);
  
  return response.indexOf("OK") != -1;
}
```

### Emergency SMS System - When Every Character Counts

```cpp
bool sendEmergencySMS(String phoneNumber, double lat, double lng) {
  String message = "EMERGENCY: Motorcycle accident detected!\n";
  message += "Location: " + String(lat, 6) + ", " + String(lng, 6) + "\n";
  message += "Google Maps: https://maps.google.com/?q=" + 
             String(lat, 6) + "," + String(lng, 6) + "\n";
  message += "Time: " + getCurrentTimestamp() + "\n";
  message += "Helmet ID: SMH001";
  
  Serial.println("Sending emergency SMS...");
  Serial.println("To: " + phoneNumber);
  Serial.println("Message: " + message);
  
  // Set SMS text mode
  if (!sendATCommand("AT+CMGF=1", 1000)) {
    Serial.println("Failed to set SMS mode");
    return false;
  }
  
  // Set recipient number
  gsm.print("AT+CMGS=\"");
  gsm.print(phoneNumber);
  gsm.println("\"");
  delay(1000);
  
  // Send message content
  gsm.print(message);
  delay(1000);
  
  // Send Ctrl+Z to complete SMS
  gsm.write(26);
  
  // Wait for response
  long int time = millis();
  String response = "";
  
  while((time + 10000) > millis()) {  // 10 second timeout
    while(gsm.available()) {
      char c = gsm.read();
      response += c;
    }
    
    if (response.indexOf("OK") != -1) {
      Serial.println("SMS sent successfully!");
      return true;
    }
  }
  
  Serial.println("SMS failed to send");
  return false;
}

void makeEmergencyCall(String phoneNumber) {
  Serial.println("Making emergency call to: " + phoneNumber);
  
  gsm.print("ATD");
  gsm.print(phoneNumber);
  gsm.println(";");
  
  delay(30000);  // Let it ring for 30 seconds
  
  // Hang up
  gsm.println("ATH");
  Serial.println("Call ended");
}
```

### Multiple Contact Emergency System

```cpp
String emergencyContacts[] = {
  "+1234567890",  // Primary emergency contact
  "+0987654321",  // Secondary contact
  "+1122334455"   // Tertiary contact
};

void alertAllEmergencyContacts(double lat, double lng) {
  for (int i = 0; i < 3; i++) {
    Serial.println("Alerting contact " + String(i + 1) + ": " + emergencyContacts[i]);
    
    if (sendEmergencySMS(emergencyContacts[i], lat, lng)) {
      Serial.println("Successfully alerted contact " + String(i + 1));
    } else {
      Serial.println("Failed to alert contact " + String(i + 1));
    }
    
    delay(2000);  // Wait 2 seconds between messages
  }
  
  // Make voice call to primary contact
  makeEmergencyCall(emergencyContacts[0]);
}
```

---

## 6. **User Interface - Feedback is Everything**

A smart helmet that can't communicate with its user is like a smoke detector without a beep - technically functional but practically useless. Your interface components are the bridge between the helmet's digital brain and the human wearing it.

### Button Handling - Debouncing and Interrupts

```cpp
// Button handling with proper debouncing
#define BUTTON_PIN 13
volatile bool buttonPressed = false;
volatile unsigned long lastButtonTime = 0;
unsigned long buttonPressStart = 0;
bool buttonHeld = false;

void IRAM_ATTR buttonISR() {
  unsigned long currentTime = millis();
  // Debounce: ignore presses within 50ms of each other
  if (currentTime - lastButtonTime > 50) {
    buttonPressed = true;
    lastButtonTime = currentTime;
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonISR, FALLING);
  Serial.println("Button handler initialized");
}

void loop() {
  handleButtonPress();
  delay(10);
}

void handleButtonPress() {
  // Check if button was pressed
  if (buttonPressed) {
    buttonPressed = false;
    
    if (digitalRead(BUTTON_PIN) == LOW) {
      // Button press started
      buttonPressStart = millis();
      buttonHeld = false;
      Serial.println("Button pressed");
    }
  }
  
  // Check for held button (5 seconds for emergency cancel)
  if (digitalRead(BUTTON_PIN) == LOW && buttonPressStart > 0) {
    unsigned long holdTime = millis() - buttonPressStart;
    
    if (holdTime >= 5000 && !buttonHeld) {
      buttonHeld = true;
      Serial.println("Button held for 5 seconds - EMERGENCY CANCELLED!");
      cancelEmergencyAlert();
    } else if (holdTime >= 1000) {
      // Visual feedback every second
      Serial.println("Hold time: " + String(holdTime / 1000) + " seconds");
    }
  } else if (buttonPressStart > 0) {
    // Button released
    unsigned long holdTime = millis() - buttonPressStart;
    Serial.println("Button released after " + String(holdTime) + "ms");
    buttonPressStart = 0;
  }
}

void cancelEmergencyAlert() {
  Serial.println("Emergency alert cancelled by user");
  // Stop all emergency procedures
  // Turn off buzzer, cancel SMS, etc.
}
```

### Buzzer Control - Audio Feedback Patterns

```cpp
#define BUZZER_PIN 12

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

// Different buzzer patterns for different alerts
void playEmergencyAlert() {
  // Urgent, attention-getting pattern
  for (int i = 0; i < 10; i++) {
    tone(BUZZER_PIN, 1000, 200);  // 1kHz for 200ms
    delay(250);
    tone(BUZZER_PIN, 1500, 200);  // 1.5kHz for 200ms
    delay(250);
  }
  noTone(BUZZER_PIN);
}

void playLowBatteryWarning() {
  // Gentle reminder beeps
  for (int i = 0; i < 3; i++) {
    tone(BUZZER_PIN, 800, 100);
    delay(150);
  }
  noTone(BUZZER_PIN);
}

void playSystemReady() {
  // Ascending tone to indicate system ready
  tone(BUZZER_PIN, 500, 200);
  delay(200);
  tone(BUZZER_PIN, 750, 200);
  delay(200);
  tone(BUZZER_PIN, 1000, 200);
  delay(200);
  noTone(BUZZER_PIN);
}

void playCountdownBeep(int secondsRemaining) {
  // Different pitch based on urgency
  int frequency = 500 + (10 - secondsRemaining) * 100;  // Higher pitch as countdown progresses
  tone(BUZZER_PIN, frequency, 100);
  delay(150);
  noTone(BUZZER_PIN);
}
```

### LED Status Indicators

```cpp
#define LED_PIN 2

void blinkStatusLED(int pattern) {
  switch(pattern) {
    case 0:  // Normal operation - slow pulse
      digitalWrite(LED_PIN, HIGH);
      delay(100);
      digitalWrite(LED_PIN, LOW);
      delay(900);
      break;
      
    case 1:  // GPS searching - double blink
      digitalWrite(LED_PIN, HIGH);
      delay(100);
      digitalWrite(LED_PIN, LOW);
      delay(100);
      digitalWrite(LED_PIN, HIGH);
      delay(100);
      digitalWrite(LED_PIN, LOW);
      delay(700);
      break;
      
    case 2:  // Emergency mode - rapid flashing
      digitalWrite(LED_PIN, HIGH);
      delay(100);
      digitalWrite(LED_PIN, LOW);
      delay(100);
      break;
      
    case 3:  // Error condition - SOS pattern
      // S (3 short)
      for(int i = 0; i < 3; i++) {
        digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
      }
      delay(200);
      // O (3 long)
      for(int i = 0; i < 3; i++) {
        digitalWrite(LED_PIN, HIGH);
        delay(300);
        digitalWrite(LED_PIN, LOW);
        delay(100);
      }
      delay(200);
      // S (3 short)
      for(int i = 0; i < 3; i++) {
        digitalWrite(LED_PIN, HIGH);
        delay(100);
        digitalWrite(LED_PIN, LOW);
        delay(100);
      }
      delay(1000);
      break;
  }
}
```

---

## 7. **Complete System Integration - Bringing It All Together**

Now comes the moment of truth - integrating all these components into a cohesive, life-saving system. This is where we go from individual sensors to a smart helmet that actually works.

### System States and Flow Control

```cpp
#include <WiFi.h>
#include <Wire.h>
#include <MPU6050.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// System states - think of this as the helmet's "mood"
enum SystemState {
  INITIALIZING,
  NORMAL_OPERATION,
  CRASH_DETECTED,
  COUNTDOWN_ACTIVE,
  EMERGENCY_MODE,
  LOW_POWER_MODE,
  ERROR_STATE
};

SystemState currentState = INITIALIZING;
unsigned long crashDetectedTime = 0;
unsigned long countdownDuration = 30000;  // 30 seconds

// Global sensor objects
MPU6050 mpu;
TinyGPSPlus gps;
SoftwareSerial gpsSerial(16, 17);
SoftwareSerial gsmSerial(25, 26);

void setup() {
  Serial.begin(115200);
  
  Serial.println("=== Smart Helmet System Starting ===");
  
  // Initialize all subsystems
  if (!initializeAllSensors()) {
    currentState = ERROR_STATE;
    Serial.println("CRITICAL: Sensor initialization failed!");
    return;
  }
  
  if (!initializeCommunications()) {
    Serial.println("WARNING: Communication initialization failed!");
    // Continue anyway - GPS and crash detection still work
  }
  
  currentState = NORMAL_OPERATION;
  playSystemReady();
  Serial.println("Smart Helmet System Ready!");
}

void loop() {
  // Update all sensor readings
  updateSensorData();
  
  // State machine - handle current system state
  switch (currentState) {
    case NORMAL_OPERATION:
      handleNormalOperation();
      break;
      
    case CRASH_DETECTED:
      handleCrashDetected();
      break;
      
    case COUNTDOWN_ACTIVE:
      handleCountdownActive();
      break;
      
    case EMERGENCY_MODE:
      handleEmergencyMode();
      break;
      
    case LOW_POWER_MODE:
      handleLowPowerMode();
      break;
      
    case ERROR_STATE:
      handleErrorState();
      break;
  }
  
  // Update status indicators
  updateStatusDisplay();
  
  delay(100);  // 10Hz main loop
}
```

### Crash Detection and Emergency Response Flow

```cpp
void handleNormalOperation() {
  // Check battery level
  if (getBatteryPercentage() < 10) {
    currentState = LOW_POWER_MODE;
    return;
  }
  
  // Check for crash conditions
  if (detectCrashConditions()) {
    Serial.println("CRASH DETECTED!");
    crashDetectedTime = millis();
    currentState = CRASH_DETECTED;
    playEmergencyAlert();
  }
  
  // Normal status indication
  blinkStatusLED(0);  // Normal operation pattern
}

void handleCrashDetected() {
  Serial.println("CRASH DETECTION - Starting countdown");
  currentState = COUNTDOWN_ACTIVE;
  
  // Start immediate alert sounds
  playEmergencyAlert();
}

void handleCountdownActive() {
  unsigned long elapsed = millis() - crashDetectedTime;
  unsigned long remaining = countdownDuration - elapsed;
  
  // Check if user cancelled
  if (buttonHeld) {
    Serial.println("Emergency cancelled by user");
    currentState = NORMAL_OPERATION;
    return;
  }
  
  // Countdown expired - activate emergency mode
  if (elapsed >= countdownDuration) {
    Serial.println("Countdown expired - ACTIVATING EMERGENCY MODE");
    currentState = EMERGENCY_MODE;
    return;
  }
  
  // Provide countdown feedback
  int secondsRemaining = remaining / 1000;
  static int lastSecond = -1;
  
  if (secondsRemaining != lastSecond) {
    Serial.println("Emergency in " + String(secondsRemaining) + " seconds - PRESS AND HOLD BUTTON TO CANCEL");
    playCountdownBeep(secondsRemaining);
    lastSecond = secondsRemaining;
  }
  
  // Emergency status LED pattern
  blinkStatusLED(2);
}

void handleEmergencyMode() {
  Serial.println("EMERGENCY MODE ACTIVE");
  
  // Get current location
  GPSData location = getCurrentLocation();
  
  if (location.isValid) {
    // Send emergency alerts
    alertAllEmergencyContacts(location.latitude, location.longitude);
    
    // Try to send data to web backend if Wi-Fi available
    sendEmergencyDataToServer(location);
  } else {
    Serial.println("WARNING: No GPS fix - sending alert without location");
    // Send alert anyway - better than nothing
    sendEmergencyWithoutLocation();
  }
  
  // Stay in emergency mode - keep trying to send updates
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 60000) {  // Update every minute
    if (location.isValid) {
      sendLocationUpdate(location.latitude, location.longitude);
    }
    lastUpdate = millis();
  }
  
  blinkStatusLED(2);  // Keep flashing emergency pattern
}
```

### Sensor Data Integration

```cpp
struct SensorData {
  Vector acceleration;
  Vector gyroscope;
  GPSData gpsInfo;
  float batteryVoltage;
  int batteryPercent;
  bool buttonState;
  unsigned long timestamp;
};

SensorData currentSensorData;

void updateSensorData() {
  // Read motion sensor
  currentSensorData.acceleration = mpu.readNormalizeAccel();
  currentSensorData.gyroscope = mpu.readNormalizeGyro();
  
  // Update GPS data
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      currentSensorData.gpsInfo = getCurrentLocation();
    }
  }
  
  // Update battery status
  currentSensorData.batteryVoltage = readBatteryVoltage();
  currentSensorData.batteryPercent = getBatteryPercentage();
  
  // Update button state
  currentSensorData.buttonState = !digitalRead(BUTTON_PIN);
  
  // Timestamp
  currentSensorData.timestamp = millis();
}

bool detectCrashConditions() {
  // Calculate motion magnitudes
  float accelMagnitude = sqrt(
    currentSensorData.acceleration.XAxis * currentSensorData.acceleration.XAxis +
    currentSensorData.acceleration.YAxis * currentSensorData.acceleration.YAxis +
    currentSensorData.acceleration.ZAxis * currentSensorData.acceleration.ZAxis
  );
  
  float gyroMagnitude = sqrt(
    currentSensorData.gyroscope.XAxis * currentSensorData.gyroscope.XAxis +
    currentSensorData.gyroscope.YAxis * currentSensorData.gyroscope.YAxis +
    currentSensorData.gyroscope.ZAxis * currentSensorData.gyroscope.ZAxis
  );
  
  // Crash thresholds
  const float ACCEL_THRESHOLD = 3.0;   // 3g
  const float GYRO_THRESHOLD = 250.0;  // 250°/s
  
  bool crashDetected = (accelMagnitude > ACCEL_THRESHOLD) || 
                      (gyroMagnitude > GYRO_THRESHOLD);
  
  if (crashDetected) {
    Serial.println("Crash conditions met:");
    Serial.println("  Acceleration: " + String(accelMagnitude) + "g");
    Serial.println("  Gyro: " + String(gyroMagnitude) + "°/s");
  }
  
  return crashDetected;
}
```

### Communication and Data Logging

```cpp
void sendEmergencyDataToServer(GPSData location) {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Sending emergency data to server...");
    
    // Create JSON payload
    String payload = "{";
    payload += "\"helmetId\":\"SMH001\",";
    payload += "\"timestamp\":\"" + location.timestamp + "\",";
    payload += "\"latitude\":" + String(location.latitude, 6) + ",";
    payload += "\"longitude\":" + String(location.longitude, 6) + ",";
    payload += "\"altitude\":" + String(location.altitude, 1) + ",";
    payload += "\"speed\":" + String(location.speed, 1) + ",";
    payload += "\"batteryLevel\":" + String(currentSensorData.batteryPercent) + ",";
    payload += "\"emergencyType\":\"crash_detected\"";
    payload += "}";
    
    // Send HTTP POST request
    // Implementation would depend on your web service
    Serial.println("Payload: " + payload);
  } else {
    Serial.println("No Wi-Fi connection - using cellular backup");
    // Fall back to SMS alerts
  }
}

void logSensorData() {
  // Log data to SD card or internal storage
  String logEntry = String(currentSensorData.timestamp) + ",";
  logEntry += String(currentSensorData.acceleration.XAxis, 3) + ",";
  logEntry += String(currentSensorData.acceleration.YAxis, 3) + ",";
  logEntry += String(currentSensorData.acceleration.ZAxis, 3) + ",";
  logEntry += String(currentSensorData.gyroscope.XAxis, 3) + ",";
  logEntry += String(currentSensorData.gyroscope.YAxis, 3) + ",";
  logEntry += String(currentSensorData.gyroscope.ZAxis, 3) + ",";
  
  if (currentSensorData.gpsInfo.isValid) {
    logEntry += String(currentSensorData.gpsInfo.latitude, 6) + ",";
    logEntry += String(currentSensorData.gpsInfo.longitude, 6) + ",";
  } else {
    logEntry += "0,0,";
  }
  
  logEntry += String(currentSensorData.batteryPercent);
  
  Serial.println("LOG: " + logEntry);
  
  // Write to SD card if available
  // writeToSDCard(logEntry);
}
```

---

## **Final Thoughts - Making It Production Ready**

Congratulations! You've just built the foundation of a life-saving device. But remember, like any good CS50 problem set, the real challenge isn't just making it work - it's making it work **reliably** when someone's life depends on it.

### Key Principles for Production Code:

1. **Fail Gracefully**: Always have a backup plan when components fail
2. **Test Extensively**: Test in real conditions, not just on your desk
3. **Log Everything**: You can't debug what you can't see
4. **Keep It Simple**: Complex code is harder to debug and more likely to fail
5. **User Experience Matters**: If it's confusing to use, it won't save lives

Your smart helmet is now ready to be a guardian angel for motorcycle riders everywhere. Pretty amazing what a few sensors, some clever code, and a lot of careful thinking can accomplish, isn't it?

Remember: **Code saves lives**. Make it count.