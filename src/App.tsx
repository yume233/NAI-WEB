import React from 'react'
import styled from 'styled-components'
import InputArea from 'components/global/InputArea'
import Buttons from 'components/global/Buttons'
import ImgList from 'components/global/ImgList'
import Footer from 'components/global/Footer'
import SwitchImgList from 'components/global/SwitchImgList'

export default function App() {
	return (
		<Main>
			<div>
				<InputArea />
				<Buttons />
			</div>
			<ImgList />
			<SwitchImgList />
			<Footer />
		</Main>
	)
}

const Main = styled.main`
	overflow: hidden;
	background-color: aliceblue;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0;
	padding: 0;
	margin-top: '10px';
	margin-bottom: '10px';
`
