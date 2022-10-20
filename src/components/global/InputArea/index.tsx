import React, { useRef, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import {
	addNegative,
	addNegativeHide,
	addTags,
	_negativeHide,
	_tags,
	_negative,
	_wide,
	_nsfw
} from 'store/data'
export default (props: any) => {
	const tags = useStore(_tags)
	const negative = useStore(_negative)
	const negativeHide = useStore(_negativeHide)
	const tagNode = useRef<HTMLInputElement>() as any
	const negativeNode = useRef<HTMLInputElement>() as any
	const saveTag = (value: string) => {
		window.localStorage.setItem('tag', value)
		addTags(value)
	}
	const saveNegative = (value: string) => {
		window.localStorage.setItem('negative', value)
		addNegative(value)
	}
	useEffect(() => {
		const DOM = tagNode.current
		const tag = window.localStorage.getItem('tag')
		addTags(tag)
		DOM.value = tag
	}, [tagNode])
	useEffect(() => {
		const DOM = negativeNode.current
		const tag = window.localStorage.getItem('negative')
		addNegative(tag)
		console.log(tag)
		DOM.value = tag
	}, [negativeNode])
	return (
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
		</InputArea>
	)
}
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
				margin-top: 20px;
				margin-left: 0;
			}
		}
	}
`
