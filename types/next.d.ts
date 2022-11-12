import { DehydratedState } from "react-query";
import { NextPageContext } from 'next';
import { AppProps } from 'next/app';

export type PageProps = {
  dehydratedState?: DehydratedState;
}

export type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err'];
} & AppProps<P>;