import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import Scrollbar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'

//[ package ]

//=> DOM
export default (props: any) => {
	const { children, height } = props
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
							scrollX: false,
							scrollY: true,
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
	}, [height])
	return (
		<ImgBox ref={node}>
			<div style={{ height: height }}>{children}</div>
		</ImgBox>
	)
}
const ImgBox = styled.div`
	height: 100%;
	width: 15%;
	position: relative;
	margin-right: 10px;
	max-height: 100%;
	overflow: hidden;
	/* background-color: #ececec; */
	/* width: 100vw;
	max-height: 90vh; */
	> div {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
	}
	img {
		:hover {
			box-shadow: 0px 0px 8px 2px #594f4f96;
		}
		object-fit: cover;
		position: relative;
		margin: 10px;
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
