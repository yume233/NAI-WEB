import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import localforage from 'localforage'
import Imgs from './pages/Imgbox/index'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
export default function App() {
	const [imgs, setImgs] = useState([]) as any
	const [negative, setNegative] = useState(String)
	const [tags, setTags] = useState([]) as any
	const [img, setImg] = useState(String)
	const [nsfw, setNsfw] = useState(false)
	const [wide, setWide] = useState(false)
	const [lodading, setLoading] = useState(false)
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
		const DOM = tagNode.current
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

	return (
		<Main>
			<InputArea>
				<div>
					<Text
						ref={tagNode}
						style={{ marginBottom: '30px', width: '45vw' }}
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
						style={{ margin: '0 0 10px 50px', width: '45vw' }}
						id='filled-basic'
						variant='standard'
						label='Negative Prompt'
						defaultValue={negative}
						multiline
						rows={4}
						onChange={e => saveNegative(e.target.value)}
					/>
				</div>
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
					<Button
						style={{ width: '100px', marginLeft: '5px' }}
						variant='contained'
						onClick={() => {
							setImgs([])
							localforage.clear()
						}}
					>
						清空图片
					</Button>
					<Button
						style={{ width: '100px', marginLeft: '5px' }}
						variant='contained'
						onClick={() => {
							getImageData()
						}}
					>
						发送
					</Button>
					<CircularProgress
						style={{
							marginLeft: '20px',
							opacity: lodading === true ? '1' : '0'
						}}
					/>
				</div>
			</InputArea>
			<ImgBox>
				<MainImg>
					<div>
						<img src={img} />
					</div>
				</MainImg>
				<Imgs height={768 * imgs.length}>
					{imgs
						.map((item: any, index: number) => {
							return (
								<img
									key={index}
									src={item}
									onClick={e => {
										setImg(item)
									}}
								/>
							)
						})
						.reverse()}
				</Imgs>
			</ImgBox>
		</Main>
	)
}

const Main = styled.main`
	background-color: aliceblue;
	width: 100vw;
	height: 100vh;
	align-items: center;
	justify-content: flex-start;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	margin-top: '10px';
	margin-bottom: '10px';
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
	margin-bottom: 10px;
	> div {
		:last-child {
			display: flex;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
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
`
const MainImg = styled.div`
	align-content: center;
	justify-content: center;
	display: flex;
	width: 85%;
	height: 100%;
	align-items: center;
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}
`
