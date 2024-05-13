import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";

import { AppRoot, List } from '@telegram-apps/telegram-ui';
import { CellSection } from './components/CellSection';
import { FormSection } from './components/FormSection/FormSection';
import { BannerSection } from './components/BannerSection';
import { TimelineSection } from './components/TimelineSection/TimelineSection';
import { TooltipSection } from './components/TooltipSection/TooltipSection';
import { ModalSection } from './components/ModalSection/ModalSection';
import { Header } from './components/Header/Header';
import { TonProof } from "./components/TonProof/TonProof";

export const App = () => (

  <TonConnectUIProvider
  manifestUrl="https://hlam.github.io/ton-crypto-match/tonconnect-manifest.json"
  uiPreferences={{ theme: THEME.DARK }}
  actionsConfiguration={{
      twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
  }}
>

  <AppRoot>
    <Header />
    <TonProof></TonProof>
    <List>
      <CellSection />
      <FormSection />
      <BannerSection />
      <TimelineSection />
      <TooltipSection />
      <ModalSection />
    </List>
  </AppRoot>
  </TonConnectUIProvider>

);
