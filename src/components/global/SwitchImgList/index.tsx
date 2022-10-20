import React from 'react'
import { useStore } from '@nanostores/react'
import { _isListShow, setIsListShow } from 'store/data'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Fab from '@mui/material/Fab'
import styled from 'styled-components'

export default () => {
	const isListShow = useStore(_isListShow)
	return (
		<Main>
			<Fab
				color='info'
				style={{ marginTop: '-200px' }}
				onClick={() => {
					setIsListShow(!isListShow)
				}}
			>
				<ExpandLessIcon />
			</Fab>
		</Main>
	)
}
const Main = styled.div`
	position: absolute;
	bottom: 10px;
	right: 10px;
	@media screen and (min-width: 768px) {
		display: none;
	}
`
