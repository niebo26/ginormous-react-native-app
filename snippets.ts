import * as fs from 'fs';

const initial = `
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  if (NativeModules.I_DONT_EXIST_PLEASE_BABEL_DONT_IGNORE) {
    callAllConsoleLoggers('hello');
  }

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;`;

const FILE_COUNT = 1000;
const METHOD_PER_FILE = 1000;

const getFunctionName = (i: number) => {
  var base62 = require('base62/lib/custom');
  const prefix = '_';

  var charset =
    '9876543210ABCDEFGHIJKLMNOPQRSTUVWXYZ$abcdefghijklmnopqrstuvwxyz_';
  charset = base62.indexCharset(charset);

  return `${prefix}${base62.encode(i, charset)}`;
};

const generateFile = (fileIndex: number) => {
  const filePath = `./src/App${fileIndex}.js`;

  fs.writeFileSync(filePath, ``);

  for (let i = 0; i <= METHOD_PER_FILE; i++) {
    const functionName = getFunctionName(i);
    const functionCode = `${functionName}=function(o){console.log(o)};`;

    fs.appendFileSync(filePath, functionCode);
  }

  let globalFunctionCode = `
export const callAllConsoleLoggers = (a) => {`;
  for (let i = 0; i <= METHOD_PER_FILE; i++) {
    globalFunctionCode = globalFunctionCode.concat(`${getFunctionName(i)}(a);`);
  }
  globalFunctionCode = globalFunctionCode.concat(`}`);

  fs.appendFileSync(filePath, globalFunctionCode);
};

for (let i = 0; i <= FILE_COUNT; i++) {
  generateFile(i);
}

fs.writeFileSync('./App.js', initial);

fs.appendFileSync('./App.js', `function callAllConsoleLoggers(a) {`);
for (let i = 0; i <= FILE_COUNT; i++) {
  fs.appendFileSync(
    './App.js',
    `require("./src/App${i}.js").callAllConsoleLoggers(a);`,
  );
}
fs.appendFileSync('./App.js', `}`);
