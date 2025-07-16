import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Layout(){
    const [fontLoaded] = useFonts({
        'DMSans' : require('../../../assets/fonts/DMSans-Medium.ttf'),
        'DMSansRegular' : require('../../../assets/fonts/DMSans-Regular.ttf'),
        'DMSansBold': require('../../../assets/fonts/DMSans-Bold.ttf')
    });


    const onLayoutRootView = useCallback (async ()=> {
        if (fontLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontLoaded]);

    if(!fontLoaded) return null;

    return <Stack onLayout= {onLayoutRootView}/>
}