import {useCallback, useEffect, useRef, useState} from 'react';
import ReactJson from 'react-json-view';
import './style.scss';
import {TonProofApi} from "../../TonProofApi";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import useInterval from "../../hooks/useInterval";


export const TonProof = () => {
	const firstProofLoading = useRef<boolean>(true);

	const [data, setData] = useState({});
	const wallet = useTonWallet();
	const [authorized, setAuthorized] = useState(false);
	const [tonConnectUI] = useTonConnectUI();

	const recreateProofPayload = useCallback(async () => {
		if (firstProofLoading.current) {
			tonConnectUI.setConnectRequestParameters({ state: 'loading' });
			firstProofLoading.current = false;
		}

		const payload = await TonProofApi.generatePayload();

		if (payload) {
			tonConnectUI.setConnectRequestParameters({ state: 'ready', value: payload });
		} else {
			tonConnectUI.setConnectRequestParameters(null);
		}
	}, [tonConnectUI, firstProofLoading])

	if (firstProofLoading.current) {
		recreateProofPayload();
	}

	useInterval(recreateProofPayload, TonProofApi.refreshIntervalMs);

	useEffect(() =>
		tonConnectUI.onStatusChange(async w => {
			if (!w) {
				TonProofApi.reset();
				setAuthorized(false);
				return;
			}

			if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
				await TonProofApi.checkProof(w.connectItems.tonProof.proof, w.account);
			}

			if (!TonProofApi.accessToken) {
				tonConnectUI.disconnect();
				setAuthorized(false);
				return;
			}

			setAuthorized(true);
		}), [tonConnectUI]);


	const handleClick = useCallback(async () => {
		if (!wallet) {
			return;
		}
		const response = await TonProofApi.getAccountInfo(wallet.account);

		setData(response);
	}, [wallet]);

	if (!authorized) {
		return null;
	}

	return (
		<div className="ton-proof-demo">
			<h3>Demo backend API with ton_proof verification</h3>
			{authorized ? (
				<button onClick={handleClick}>
					Call backend getAccountInfo()
				</button>
			) : (
				<div className="ton-proof-demo__error">Connect wallet to call API</div>
			)}
			<ReactJson src={data} name="response" theme="ocean" />
		</div>
	);
}
