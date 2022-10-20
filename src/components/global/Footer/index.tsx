import React from 'react'
import styled from 'styled-components'
import { useStore } from '@nanostores/react'
import { _isListShow } from 'store/data'
export default () => {
	const isListShow = useStore(_isListShow)
	return (
		<Footer style={{ opacity: isListShow ? '0' : '1' }}>
			<p>
				2022-{new Date().getFullYear()}{' '}
				<a href='https://github.com/yume233'>Umia</a>@永恒星轨观测所
			</p>
		</Footer>
	)
}
const Footer = styled.div`
	@media screen and (max-width: 768px) {
		text-align: end;
	}
	z-index: 0;
	position: absolute;
	align-items: center;
	justify-content: center;
	display: flex;
	bottom: 5px;
	left: 5px;
	a {
		color: #ff819d;
	}
`
