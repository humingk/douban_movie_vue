<template>
	<el-dialog :visible="isRegistering" @close="close" id="register-component" title="注册(不好意思，暂不开放)">
		<el-form :model="registerForm" :rules="registerFormRules" ref="registerForm">
			<el-form-item prop="email">
				<el-input placeholder="请输入邮箱" type="email" v-model="registerForm.email"/>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					placeholder="请输入密码"
					show-password
					type="password"
					v-model="registerForm.password"
				/>
			</el-form-item>
			<el-form-item prop="passwordRepeat">
				<el-input
					placeholder="请再次输入密码"
					show-password
					type="password"
					v-model="registerForm.passwordRepeat"
				/>
			</el-form-item>
			<el-form-item>
				<span class="serverError">{{serverError}}</span>
			</el-form-item>
			<el-form-item>
				<el-button :loading="isLoading" @click="submitRegisterForm" type="primary">注册</el-button>
				<el-button @click="login()" type="primary">去登录</el-button>
				<el-button @click="resetForm('registerForm')" type="primary">清空</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
	import {mapActions, mapState} from 'vuex'

	export default {
		name: 'register-component',
		data() {
			// 密码校验
			var validatorPassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('密码不能为空'))
				} else if (
					value !== this.registerForm.passwordRepeat &&
					this.registerForm.passwordRepeat !== ''
				) {
					callback(new Error('两次密码不一致'))
				} else {
					callback()
				}
			}
			// 重复密码
			var validatorPasswordRepeat = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('密码不能为空'))
				} else if (value !== this.registerForm.password) {
					callback(new Error('两次密码不一致'))
				} else {
					callback()
				}
			}
			return {
				registerForm: {
					email: '',
					password: '',
					passwordRepeat: ''
				},
				// 是否正在请求
				isLoading: false,
				// 服务器返回的错误
				serverError: null,
				// 注册表单初步校验
				registerFormRules: {
					email: [
						{
							required: true,
							message: '邮箱不能为空',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱',
							trigger: 'blur'
						}
					],
					password: [
						{
							required: true,
							validator: validatorPassword,
							trigger: 'blur'
						}
					],
					passwordRepeat: [
						{
							required: true,
							validator: validatorPasswordRepeat,
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			// 提交注册表单
			submitRegisterForm() {
				this.isLoading = true
				this.serverError = null
				this.$refs.registerForm.validate(valid => {
					if (valid) {
						this.$api.user
							.register({
								email: this.registerForm.email,
								password: this.registerForm.password
							})
							.then(res => {
								// 更新userInfo
								this.update({key: 'userInfo', value: res})
								// 隐藏注册弹窗
								this.updatePopups({key: 'isRegistering', value: false})
								this.isLoading = false
								// 刷新当前路由
								location.reload()
							})
							.catch(error => {
								if (error.msg) {
									// 服务端错误
									this.serverError = error.msg
								} else {
									// axios错误
									this.serverError = error.message
								}
								this.isLoading = false
							})
					} else {
						this.isLoading = false
					}
				})
			},
			// 登录
			login() {
				// 隐藏注册弹窗
				this.updatePopups({key: 'isRegistering', value: false})
				// 显示弹窗
				this.updatePopups({key: 'isLogining', value: true})
			},
			// 表单重置
			resetForm(form) {
				// 重置内容
				this.$refs[form].resetFields()
				// 重置验证
				this.$refs[form].clearValidate()
				// 重置请求错误
				this.serverError = null
			},
			close() {
				this.updatePopups({key: 'isRegistering', value: false})
			},
			...mapActions(['update', 'updatePopups'])
		},
		computed: {
			...mapState({
				// 注册弹窗
				isRegistering: state => state.popups.isRegistering
			})
		}
	}
</script>
<style>
</style>
