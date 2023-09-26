import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components/native";
import { StatusBar } from "react-native";
import { BlurView } from "expo-blur";
import Btn from "../../components/Auth/Btn";
import { Text } from "react-native";
import axios from "axios";

const LOGO_URL =
	"http://logok.org/wp-content/uploads/2014/07/airbnb-logo-belo-219x286.png";

const Container = styled.View`
	flex: 1;
`;

const Image = styled.Image`
	position: absolute;
	z-index: -1;
	top: 0;
`;

const Logo = styled.Image`
	margin-top: 50px;
	width: 100px;
	height: 100px;
`;

const BtnContainer = styled.View`
	margin-top: 40px;
`;

const Footer = () => (
	<Text
		style={{
			color: "black",
			fontSize: "24",
			textAlign: "center",
		}}
	>
		XOXO Jason
	</Text>
);


export default ({ navigation }) => {
	const goToSignUp = () => navigation.navigate("SignUp");
	const goToSignIn = () => navigation.navigate("SignIn");
	const [kanye, setKanye] = useState("Kanye");

	const axioKanye = axios.get("https://api.kanye.rest");

	function retKanye() {
		axioKanye
			.then((res) => setKanye(JSON.stringify(res.data.quote)))
			.catch((err) => console.error(err));
	}

	return (
		<Container>
			<BlurView
				intensity={50}
				tint='light'
				style={{
					flex: 1,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Footer></Footer>
				<Logo source={{ uri: LOGO_URL }} />
				<Text
					style={{
						color: "black",
						fontSize: "20",
						textAlign: "center",
					}}
				>
					{kanye}
				</Text>
				<BtnContainer>
					<Btn onPress={goToSignUp} text={"Sign Up"} accent={true} />
					<Btn onPress={goToSignIn} text={"Sign In"} />
				</BtnContainer>
				<BtnContainer>
				<Fragment>
			{kanye !== "" ? (
				<>
					<Btn onPress={retKanye} text={"KanyeRefresh!"} accent={true} />
				</>
			) : (
				<Text>No Kanye Found</Text>
			)}
		</Fragment>
		</BtnContainer>
			</BlurView>

			<Image source={require("../../assets/loginBg.jpeg")} />
			<StatusBar barStyle='dark-content' />
		</Container>
	);
};
