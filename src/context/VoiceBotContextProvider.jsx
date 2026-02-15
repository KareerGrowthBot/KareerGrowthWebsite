"use client";

import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useEffect,
    useRef,
    useCallback,
} from "react";

export const START_LISTENING = "start_listening";
export const START_THINKING = "start_thinking";
export const START_SPEAKING = "start_speaking";
export const START_SLEEPING = "start_sleeping";
export const INCREMENT_SLEEP_TIMER = "increment_sleep_timer";
export const ADD_MESSAGE = "add_message";
export const SET_PARAMS_ON_COPY_URL = "set_attach_params_to_copy_url";
export const ADD_BEHIND_SCENES_EVENT = "add_behind_scenes_event";

export const VoiceBotStatus = {
    LISTENING: "listening",
    THINKING: "thinking",
    SPEAKING: "speaking",
    SLEEPING: "sleeping",
    NONE: "",
};

export const voiceBotReducer = (state, action) => {
    switch (action.type) {
        case START_LISTENING:
            return { ...state, status: VoiceBotStatus.LISTENING, sleepTimer: 0 };
        case START_THINKING:
            return { ...state, status: VoiceBotStatus.THINKING };
        case START_SPEAKING:
            return { ...state, status: VoiceBotStatus.SPEAKING, sleepTimer: 0 };
        case START_SLEEPING:
            return { ...state, status: VoiceBotStatus.SLEEPING };
        case INCREMENT_SLEEP_TIMER:
            return { ...state, sleepTimer: state.sleepTimer + 1 };
        case ADD_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] };
        case SET_PARAMS_ON_COPY_URL:
            return { ...state, attachParamsToCopyUrl: action.payload };
        case ADD_BEHIND_SCENES_EVENT:
            return {
                ...state,
                behindTheScenesEvents: [...state.behindTheScenesEvents, action.payload],
            };
        default:
            return state;
    }
};

const initialState = {
    status: VoiceBotStatus.NONE,
    sleepTimer: 0,
    messages: [],
    attachParamsToCopyUrl: true,
    behindTheScenesEvents: [],
};

const VoiceBotContext = createContext(undefined);

export function useVoiceBot() {
    const context = useContext(VoiceBotContext);
    if (!context) throw new Error("useVoiceBot must be used within a VoiceBotProvider");
    return context;
}

export function VoiceBotProvider({ children }) {
    const [state, dispatch] = useReducer(voiceBotReducer, initialState);
    const isWaitingForUserVoiceAfterSleep = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: INCREMENT_SLEEP_TIMER });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (state.sleepTimer > 30) {
            isWaitingForUserVoiceAfterSleep.current = true;
            dispatch({ type: START_SLEEPING });
        }
    }, [state.sleepTimer]);

    const startSpeaking = useCallback((wakeFromSleep = false) => {
        if (wakeFromSleep || state.status !== VoiceBotStatus.SLEEPING) {
            dispatch({ type: START_SPEAKING });
        }
    }, [state.status]);

    const startListening = useCallback((wakeFromSleep = false) => {
        if (wakeFromSleep || state.status !== VoiceBotStatus.SLEEPING) {
            dispatch({ type: START_LISTENING });
        }
    }, [state.status]);

    const toggleSleep = useCallback(() => {
        if (state.status === VoiceBotStatus.SLEEPING) {
            startListening(true);
        } else {
            isWaitingForUserVoiceAfterSleep.current = true;
            dispatch({ type: START_SLEEPING });
        }
    }, [state.status, startListening]);

    const contextValue = useMemo(() => ({
        ...state,
        isWaitingForUserVoiceAfterSleep,
        addVoicebotMessage: (payload) => dispatch({ type: ADD_MESSAGE, payload }),
        addBehindTheScenesEvent: (payload) => dispatch({ type: ADD_BEHIND_SCENES_EVENT, payload }),
        startSpeaking,
        startListening,
        toggleSleep,
    }), [state, startListening, startSpeaking, toggleSleep]);

    return <VoiceBotContext.Provider value={contextValue}>{children}</VoiceBotContext.Provider>;
}
