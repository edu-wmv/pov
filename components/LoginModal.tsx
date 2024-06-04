import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { View, Text } from "react-native";

export default function LoginModal() {
	const LoginModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["25%", "55%"], []);

	return (
		<BottomSheetModal ref={LoginModalRef} index={1} snapPoints={snapPoints}>
			<BottomSheetView>
				<Text>Login</Text>
			</BottomSheetView>
		</BottomSheetModal>
	);
}
