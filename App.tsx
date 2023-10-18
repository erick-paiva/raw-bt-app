import { StatusBar } from "expo-status-bar";
import { Linking, StyleSheet, Text, View, Button } from "react-native";

import * as Print from "expo-print";

const teste = [
  { password: "a001" },
  { password: "c002" },
  { password: "c003" },
];

const generateHtml = (senhas: typeof teste) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  
  <body>
      <ul>
        ${teste.map(
          ({ password }) => `<li style="font-size: 30px;">${password}</li>`
        )}
      </ul>
  </body>
  
  </html>`;

  return html;
};

export default function App() {
  const print = (base64: string) => {
    const fileType = "application/pdf";

    const dataUrl = `data:${fileType};base64,${base64}`;

    Linking.openURL(`rawbt:${dataUrl}`);
  };

  const printToFile = async () => {
    const html = generateHtml(teste);

    const { base64 } = await Print.printToFileAsync({
      html,
      height: 20,
      margins: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 20,
      },
      base64: true,
    });

    base64 && print(base64);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={printToFile} title="print" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
