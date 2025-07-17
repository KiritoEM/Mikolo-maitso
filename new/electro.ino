const int pinRelais = 7;               // Pin relais
const float debitParSeconde = 66.7;    // 240 l/h

bool pompeEnMarche = false;
unsigned long tempsDebut = 0;
unsigned long dureeActivation = 0;

void setup() {
  Serial.begin(9600);
  pinMode(pinRelais, OUTPUT);
  digitalWrite(pinRelais, HIGH);  // Relais OFF (active LOW)
  Serial.println("Arduino prêt");
}

void loop() {
  // Lire les données série uniquement si la pompe n'est pas déjà active
  if (!pompeEnMarche && Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    Serial.print("Reçu: ");
    Serial.println(data);

    int quantite = data.toInt();
    if (quantite > 0) {
      dureeActivation = (unsigned long)(quantite / debitParSeconde * 1000);
      pompeEnMarche = true;
      tempsDebut = millis();
      digitalWrite(pinRelais, LOW);  // Pompe ON (active LOW)
      Serial.print("Pompe activée pour ");
      Serial.print(dureeActivation);
      Serial.println(" ms");
    } else {
      Serial.println("Quantité invalide");
    }
  }

  // Vérifier si la pompe doit être arrêtée
  if (pompeEnMarche) {
    unsigned long tempsEcoule = millis() - tempsDebut;
    if (tempsEcoule >= dureeActivation) {
      digitalWrite(pinRelais, HIGH);  // Pompe OFF
      pompeEnMarche = false;
      Serial.println("Pompe arrêtée");
    }
  }
}
