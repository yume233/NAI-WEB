import React, { useRef, useEffect } from 'react'
import localforage from 'localforage'
import { useStore } from '@nanostores/react'
import styled from 'styled-components'
import {
	addImg,
	addImgs,
	addisListShow,
	_imgs,
	_img,
	_tags,
	_negative,
	_wide,
	_nsfw,
	_isListShow
} from 'store/data'

//=> DOM
export default (props: any) => {
	const imgs = useStore(_imgs)
	const isListShow = useStore(_isListShow)
	const img = useStore(_img)
	useEffect(() => {
		localforage.keys().then((keys: any) => {
			keys.forEach(async (key: any) => {
				localforage.getItem(key).then((value: any) => {
					setTimeout(() => {
						addImg(URL.createObjectURL(value))
						addImgs([...imgs, URL.createObjectURL(value)])
					}, 1000)
				})
			})
		})
	}, [''])
	return (
		<ImgBox>
			<MainImg hide={isListShow}>
				<div>
					<img
						src={img}
						onClick={() => {
							addisListShow(!isListShow)
						}}
					/>
				</div>
			</MainImg>
			<ImgList hide={isListShow}>
				<div>
					{imgs
						.map((item: any, index: number) => {
							return (
								<img
									key={index}
									src={item}
									onClick={() => {
										addImg(item)
										addisListShow(!isListShow)
									}}
								/>
							)
						})
						.reverse()}
				</div>
			</ImgList>
		</ImgBox>
	)
}

const ImgBox = styled.div`
	z-index: 1;
	overflow: hidden;
	width: 100vw;
	height: 80vh;
	align-content: center;
	justify-content: center;
	display: flex;
	margin-top: 5px;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`
const MainImg = styled.div<{ hide: boolean }>`
	align-content: center;
	justify-content: center;
	display: flex;
	width: 85%;
	@media screen and (max-width: 768px) {
		z-index: 0;
		height: ${({ hide }) => (hide ? '0' : '100%')};
		opacity: ${({ hide }) => (hide ? '0' : '1')};
	}
	align-items: center;
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}
`

const ImgList = styled.div<{ hide: boolean }>`
	height: 100%;
	width: 18%;
	position: relative;
	max-height: 100%;
	overflow-y: scroll;
	/* background-color: #dddddd64; */

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
