import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from "react-native-reanimated";

import Timer from "./Timer";
import EllapsedTime from "../EllapsedTime";
import FinishButton from "./FinishButton";

interface HeaderProps {
    headerHeight: number;
    height: SharedValue<number>;
    onFormSubmit: () => void;
    allSetsAreComplete: () => boolean;
}

export default function Header({ allSetsAreComplete, headerHeight, height, onFormSubmit }: HeaderProps) {
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(height.value, [650, headerHeight], [1, 0], Extrapolation.CLAMP)
    }));

    const ellapsedTimeAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(height.value, [650, headerHeight], [0, -20], Extrapolation.CLAMP)
        }]
    }))

    return (
        <View style={[styles.container, { height: headerHeight }]}>
            <Animated.View style={[styles.restTimer, buttonAnimatedStyle]}>
                <Timer />
            </Animated.View>
            <Animated.View style={[styles.ellapsedTime, ellapsedTimeAnimatedStyle]}>
                <EllapsedTime />
            </Animated.View>
            <Animated.View style={[styles.finishButtonSection, buttonAnimatedStyle]}>
                <FinishButton allSetsAreComplete={allSetsAreComplete} onFormSubmit={onFormSubmit} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%"
    },
    restTimer: {
        alignItems: "flex-start",
        flex: 1,
        justifyContent: "center",
        paddingLeft: 15,
    },
    ellapsedTime: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    finishButtonSection: {
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center",
        paddingRight: 15
    }
})