import React from 'react'
import styled from 'styled-components'

//[ package ]

//=> DOM
export default (props: any) => {
	const { children, hide } = props

	return (
		<ImgBox hide={hide}>
			<div>{children}</div>
		</ImgBox>
	)
}
const ImgBox = styled.div<{ hide: boolean }>`
	height: 100%;
	width: 18%;
	position: relative;
	max-height: 100%;
	overflow-y: scroll;
	/* background-color: #ececec; */
	/* width: 100vw;
	max-height: 90vh; */
	@media screen and (max-width: 768px) {
		z-index: 99;
		height: ${({ hide }) => (hide ? '100%' : '0')};
		opacity: ${({ hide }) => (hide ? '1' : '0')};
		width: 85%;
	}
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
