import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import localforage from 'localforage'
import Imgs from './pages/Imgbox/index'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderZipTwoToneIcon from '@mui/icons-material/FolderZipTwoTone'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Fab from '@mui/material/Fab'
export default function App() {
	const [imgs, setImgs] = useState([]) as any
	const [negative, setNegative] = useState(String)
	const [tags, setTags] = useState([]) as any
	const [img, setImg] = useState(String)
	const [nsfw, setNsfw] = useState(false)
	const [wide, setWide] = useState(false)
	const [lodading, setLoading] = useState(false)
	const [imgList, setImgList] = useState(false)
	const [negativeHide, setNegativeHide] = useState(false)
	const getImageData = async () => {
		setLoading(true)
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
				setImgs([...imgs, url])
				setImg(url)
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}
	const tagNode = useRef<HTMLInputElement>() as any
	const negativeNode = useRef<HTMLInputElement>() as any
	const negativeSw = useRef<HTMLInputElement>() as any
	const saveTag = (value: string) => {
		window.localStorage.setItem('tag', value)
		setTags(value)
	}
	const saveNegative = (value: string) => {
		window.localStorage.setItem('negative', value)
		setNegative(value)
	}

	useEffect(() => {
		const DOM = tagNode.current
		const tag = window.localStorage.getItem('tag')
		setTags(tag)
		console.log(tag)
		DOM.value = tag
	}, [tagNode])
	useEffect(() => {
		const DOM = negativeNode.current
		const tag = window.localStorage.getItem('negative')
		setNegative(tag)
		console.log(tag)
		DOM.value = tag
	}, [negativeNode])
	useEffect(() => {
		localforage.keys().then((keys: any) => {
			keys.forEach(async (key: any) => {
				localforage.getItem(key).then((value: any) => {
					setTimeout(() => {
						setImg(URL.createObjectURL(value))
						setImgs((imgs: any) => [...imgs, URL.createObjectURL(value)])
					}, 1000)
				})
			})
		})
	}, [''])
	useEffect(() => {
		if (window.outerWidth > 768) {
			negativeSw.current.style = 'display: none'
			setNegativeHide(true)
		} else {
			setNegativeHide(false)
		}
	}, [window.outerWidth])
	return (
		<Main>
			<InputArea>
				<Texts>
					<Text
						ref={tagNode}
						id='filled-basic'
						variant='standard'
						label='Prompt'
						defaultValue={tags}
						multiline
						rows={4}
						onChange={e => saveTag(e.target.value)}
					/>
					<Text
						ref={negativeNode}
						id='filled-basic'
						variant='standard'
						label='Negative Prompt'
						defaultValue={negative}
						multiline
						rows={4}
						style={{
							height: negativeHide ? 'auto' : '0',
							opacity: negativeHide ? '1' : '0'
						}}
						onChange={e => saveNegative(e.target.value)}
					/>
				</Texts>
				<div>
					<FormControlLabel
						control={
							<Switch
								checked={wide}
								onChange={e => {
									setWide(e.target.checked)
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
									setNsfw(e.target.checked)
								}}
							/>
						}
						label='NSFW/SFW'
					/>
					<FormControlLabel
						ref={negativeSw}
						control={
							<Switch
								checked={negativeHide}
								onChange={e => {
									setNegativeHide(!negativeHide)
								}}
							/>
						}
						label='排除词'
					/>
					<div>
						<Button
							startIcon={<DeleteIcon />}
							style={{ width: '100px', marginLeft: '5px' }}
							variant='outlined'
							color='error'
							onClick={() => {
								setImgs([])
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
							loading={lodading}
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
				</div>
			</InputArea>
			<ImgBox>
				<MainImg hide={imgList}>
					<div>
						<img src={img} />
					</div>
				</MainImg>
				<Imgs height={300 * imgs.length} hide={imgList}>
					{imgs
						.map((item: any, index: number) => {
							return (
								<img
									key={index}
									src={item}
									onClick={() => {
										setImg(item)
										setImgList(!imgList)
									}}
								/>
							)
						})
						.reverse()}
				</Imgs>
			</ImgBox>
			<Footer style={{ opacity: imgList ? '0' : '1' }}>
				<p>
					2022-{new Date().getFullYear()}{' '}
					<a href='mailto:umia@umia.moe'>Umia</a>@永恒星轨观测所
				</p>
			</Footer>
			<div>
				<Fab
					color='info'
					onClick={() => {
						setImgList(!imgList)
					}}
				>
					<ExpandLessIcon />
				</Fab>
			</div>
		</Main>
	)
}

const Main = styled.main`
	overflow: hidden;
	background-color: aliceblue;
	width: 100vw;
	height: 100vh;
	align-items: center;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	margin-top: '10px';
	margin-bottom: '10px';
	> div {
		:last-child {
			position: absolute;
			bottom: 10px;
			right: 10px;
			@media screen and (min-width: 768px) {
				display: none;
			}
		}
	}
`
const Text = styled(TextField)`
	position: relative;
	width: 98vw;
	height: 100px;
`

const InputArea = styled.div`
	margin-top: 10px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;

	> div {
		:last-child {
			display: flex;
			align-content: center;
			align-items: center;
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
		}
	}
`

const ImgBox = styled.div`
	overflow: hidden;
	width: 100vw;
	height: 87vh;
	align-content: center;
	justify-content: center;
	display: flex;
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
const Texts = styled.div`
	margin-bottom: 10px;
	> div {
		width: 45vw;
		:last-child {
			margin-left: 30px;
		}
	}
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		> div {
			width: 97vw;
			:last-child {
				margin-left: 0;
			}
		}
	}
`
const Footer = styled.div`
	@media screen and (max-width: 768px) {
		text-align: end;
	}
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
