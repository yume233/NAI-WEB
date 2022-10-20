import React, { useRef, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import FolderZipTwoToneIcon from '@mui/icons-material/FolderZipTwoTone'
import localforage from 'localforage'
import { useStore } from '@nanostores/react'
import styled from 'styled-components'
import axios from 'axios'
import {
	_img,
	_nsfw,
	_imgs,
	_wide,
	_tags,
	_negativeHide,
	_loading,
	_negative,
	addLoading,
	addImg,
	addNegativeHide,
	addNsfw,
	addWide,
	addImgs
} from 'store/data'

export default (props: any) => {
	const negativeNode = useRef<HTMLInputElement>() as any
	const tags = useStore(_tags)
	const wide = useStore(_wide)
	const negative = useStore(_negative)
	const nsfw = useStore(_nsfw)
	const negativeHide = useStore(_negativeHide)
	const loading = useStore(_loading)
	const imgs = useStore(_imgs)
	const node = useRef<HTMLInputElement>() as any
	useEffect(() => {
		if (window.outerWidth >= 768) {
			node.current.style = 'display: none'
			addNegativeHide(true)
			// document.documentElement.requestFullscreen()
		} else {
			addNegativeHide(false)
		}
	}, [window.outerWidth])
	const getImageData = async () => {
		addLoading(true)
		await axios({
			method: 'post',
			url: `https://api.kotori.icu/api`,
			responseType: 'blob',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				tag: tags,
				negative: negative,
				wide: wide,
				nsfw: nsfw
			},
			timeout: 300000
		})
			.then(async res => {
				const images = await localforage.keys()
				await localforage.setItem(`IMAGE_${images.length + 1}`, res.data)
				const url = URL.createObjectURL(res.data)
				addImgs([...imgs, url])
				addImg(url)
				addLoading(false)
			})
			.catch(err => {
				console.error(err)
				addLoading(false)
			})
	}
	return (
		<Main>
			<div>
				<FormControlLabel
					control={
						<Switch
							checked={wide}
							onChange={e => {
								addWide(e.target.checked)
							}}
						/>
					}
					label='宽/窄'
				/>
				<FormControlLabel
					control={
						<Switch
							checked={nsfw}
							onChange={e => {
								addNsfw(e.target.checked)
							}}
						/>
					}
					label='NSFW/SFW'
				/>
				<FormControlLabel
					ref={node}
					control={
						<Switch
							checked={negativeHide}
							onChange={e => {
								addNegativeHide(!negativeHide)
							}}
						/>
					}
					label='排除词'
				/>
			</div>
			<div>
				<Button
					startIcon={<DeleteIcon />}
					style={{ width: '100px', marginLeft: '5px' }}
					variant='outlined'
					color='error'
					onClick={() => {
						addImgs([])
						localforage.clear()
					}}
				>
					清空
				</Button>
				<Button
					startIcon={<FolderZipTwoToneIcon />}
					style={{ width: '100px', marginLeft: '5px' }}
					variant='outlined'
					onClick={() => {}}
					disabled
				>
					打包
				</Button>
				<LoadingButton
					loading={loading}
					endIcon={<SendIcon />}
					style={{ width: '100px', marginLeft: '5px' }}
					variant='contained'
					loadingPosition='end'
					onClick={() => {
						getImageData()
					}}
				>
					发送
				</LoadingButton>
			</div>
		</Main>
	)
}
const Main = styled.div`
	display: flex;
	align-content: center;
	/* align-items: center; */
	> div {
		:last-child {
			display: flex;
		}
	}
	@media screen and (max-width: 768px) {
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		div {
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
	}
`
