import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import localforage from 'localforage'
import ImgBox from './pages/Imgbox/index'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
export default function App() {
	const [imgs, setImgs] = useState([]) as any
	const [tags, setTags] = useState([]) as any
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
				wide: wide,
				nsfw: nsfw
			},
			timeout: 300000
		})
			.then(async res => {
				const images = await localforage.keys()
				await localforage.setItem(`IMAGE_${images.length + 1}`, res.data)
				setImgs([...imgs, URL.createObjectURL(res.data)])
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
				setLoading(false)
			})
	}
	const tagNode = useRef<HTMLInputElement>() as any
	const saveTag = (value: string) => {
		window.localStorage.setItem('tag', value)
	}
	useEffect(() => {
		const DOM = tagNode.current
		const tag = window.localStorage.getItem('tag')
		setTags(tag)
		console.log(tag)
		DOM.value = tag
	}, [tagNode])
	useEffect(() => {
		localforage.keys().then((keys: any) => {
			keys.forEach(async (key: any) => {
				localforage.getItem(key).then((value: any) => {
					setTimeout(() => {
						setImgs((imgs: any) => [...imgs, URL.createObjectURL(value)])
					}, 1000)
				})
			})
		})
	}, [''])

	return (
		<Main>
			<InputArea>
				<Text
					ref={tagNode}
					style={{ marginBottom: '30px' }}
					id='filled-basic'
					variant='standard'
					label='此处输入tag'
					defaultValue={tags}
					multiline
					rows={4}
					onChange={e => saveTag(e.target.value)}
				/>
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
			<div>
				<ImgBox widht={768 * imgs.length}>
					{imgs
						.map((item: any, index: number) => {
							if ((index & 1) === 0 && index !== 0)
								return <img key={index} src={item} />
						})
						.reverse()}
				</ImgBox>
				<ImgBox widht={768 * imgs.length}>
					{imgs
						.map((item: any, index: number) => {
							if ((index & 2) === 0) return <img key={index} src={item} />
						})
						.reverse()}
				</ImgBox>
			</div>
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
	height: 13vh;
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
