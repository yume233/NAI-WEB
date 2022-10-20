import ImgList from 'components/global/ImgList'
import { atom } from 'nanostores'

export const _wide = atom<boolean>(false)
export const _nsfw = atom<boolean>(false)
export const _loading = atom<boolean>(false)
export const _negativeHide = atom<boolean>(true)
export const _isListShow = atom<boolean>(false)
export const _negative = atom<string>()
export const _tags = atom<string>('')
export const _img = atom<string>('')
export const _imgs = atom([])
export const _fileName = atom<string>()
export function addWide(value: boolean) {
	_wide.set(value)
}
export function addNsfw(value: boolean) {
	_nsfw.set(value)
}
export function addLoading(value: boolean) {
	_loading.set(value)
}
export function addNegativeHide(value: boolean) {
	_negativeHide.set(value)
}
export function addisListShow(value: boolean) {
	_isListShow.set(value)
}
export function addNegative(value: string) {
	_negative.set(value)
}
export function addTags(value: string) {
	_tags.set(value)
}
export function addImg(value: string) {
	_img.set(value)
}
export function addImgs(value: string[]) {
	_imgs.set(value)
}
