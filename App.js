import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import RootNavigator from '../NathanEdler-ROI-Mobile/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const theme = {
  "colors": {
    "primary": "rgb(175, 46, 45)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 218, 214)",
    "onPrimaryContainer": "rgb(65, 0, 3)",
    "secondary": "rgb(119, 86, 83)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(255, 218, 214)",
    "onSecondaryContainer": "rgb(44, 21, 19)",
    "tertiary": "rgb(114, 91, 46)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 222, 166)",
    "onTertiaryContainer": "rgb(38, 25, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(32, 26, 25)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(32, 26, 25)",
    "surfaceVariant": "rgb(245, 221, 219)",
    "onSurfaceVariant": "rgb(83, 67, 66)",
    "outline": "rgb(133, 115, 113)",
    "outlineVariant": "rgb(216, 194, 191)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(54, 47, 46)",
    "inverseOnSurface": "rgb(251, 238, 236)",
    "inversePrimary": "rgb(255, 179, 173)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(251, 241, 245)",
      "level2": "rgb(249, 235, 238)",
      "level3": "rgb(246, 229, 232)",
      "level4": "rgb(245, 226, 230)",
      "level5": "rgb(244, 222, 226)"
    },
    "surfaceDisabled": "rgba(32, 26, 25, 0.12)",
    "onSurfaceDisabled": "rgba(32, 26, 25, 0.38)",
    "backdrop": "rgba(59, 45, 44, 0.4)"
  }
}