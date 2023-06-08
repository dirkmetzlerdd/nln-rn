/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Service } from "./types/service";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  NewsDetails: undefined;
  ServiceDetails: { service: Partial<Service> };
  AddService: undefined;
  FindService: undefined;
  SetActiveService: undefined;
  Account: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  News: undefined;
  Profile: undefined;
  Services: undefined;
  NLNList: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
