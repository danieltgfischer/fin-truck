import React, { useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { PurchaseUpgrade } from '../purchaseUpgrade';

interface IProps {
	isPurchaselVisible: boolean;
	setIsPurchaselVisible: Dispatch<SetStateAction<boolean>>;
}

export const Purchase: React.FC<IProps> = (props: IProps) => {
	const { height } = useWindowDimensions();
	const translateY = useRef(new Animated.Value(height)).current;

	useEffect(() => {
		if (props.isPurchaselVisible) {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start();
			return;
		}
		Animated.timing(translateY, {
			toValue: height,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [height, props.isPurchaselVisible, translateY]);

	return (
		<PurchaseUpgrade
			translateY={translateY}
			setIsPurchaselVisible={props.setIsPurchaselVisible}
		/>
	);
};
