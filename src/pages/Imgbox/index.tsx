import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import Scrollbar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'

//[ package ]

//=> DOM
export default (props: any) => {
	const { children, widht } = props
	const node = useRef<HTMLDivElement>(null)
	const [BScrollCore, setBScroll] = useState<BScroll | null>(null)
	useEffect(() => {
		if (node) {
			const DOM = node.current
			//=> 装载 BetterScroll
			BScroll.use(Scrollbar)
			BScroll.use(MouseWheel)
			setTimeout(
				() =>
					setBScroll(
						new BScroll(DOM, {
							scrollX: true,
							scrollY: false,
							mouseWheel: true
						})
					),
				10
			)
		}
	}, [node])
	useEffect(() => {
		if (BScrollCore) {
			setTimeout(() => BScrollCore.refresh(), 1000)
			BScrollCore.scrollTo(0, 0)
		}
	}, [widht])
	return (
		<ImgBox ref={node}>
			<div style={{ width: widht }}>{children}</div>
		</ImgBox>
	)
}
const ImgBox = styled.div`
	position: relative;
	/* background-color: #ececec; */
	width: 100vw;
	max-height: 90vh;
	> div {
		overflow: hidden;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	img {
		:hover {
			box-shadow: 0px 0px 8px 2px #594f4f96;
		}
		position: relative;
		margin: 5px;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		animation: fadenum 1s 1;
	}
	@keyframes fadenum {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
`
