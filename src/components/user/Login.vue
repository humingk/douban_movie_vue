<template>
	<el-dialog :visible="isLogining" @close="close()" id="login-component" title="登录(不好意思，暂不开放)">
		<el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
			<el-form-item prop="email">
				<el-input placeholder="请输入邮箱" type="email" v-model="loginForm.email"/>
			</el-form-item>
			<el-form-item prop="password">
				<el-input placeholder="请输入密码" show-password type="password" v-model="loginForm.password"/>
			</el-form-item>
			<el-form-item>
				<span class="serverError">{{serverError}}</span>
			</el-form-item>
			<el-form-item>
				<el-button :loading="isLoading" @click="submitLoginForm" type="primary">登录</el-button>
				<el-button @click="singup()" type="primary">去注册</el-button>
				<el-button @click="resetForm('loginForm')" type="primary">清空</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
	import {mapActions, mapState} from 'vuex'

	export default {
		name: 'login-component',
		data() {
			return {
				// 请求表单
				loginForm: {
					email: '',
					password: ''
				},
				// 是否正在请求
				isLoading: false,
				// 服务器返回的错误
				serverError: null,
				// 登录表单初步校验
				loginFormRules: {
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
							message: '密码不能为空',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			// 提交登录表单
			submitLoginForm() {
				this.isLoading = true
				this.serverError = null
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.$api.user.login({
							email: this.loginForm.email,
							password: this.loginForm.password
						}).then(res => {
							// 更新userInfo
							this.update({key: 'userInfo', value: res})
							// 隐藏登录弹窗
							this.updatePopups({key: 'isLogining', value: false})
							this.isLoading = false
							// 刷新当前路由
							location.reload()
						}).catch(error => {
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
				this.updatePopups({key: 'isLogining', value: false})
			},
			// 注册
			singup() {
				// 隐藏登录弹窗
				this.updatePopups({key: 'isLogining', value: false})
				// 显示弹窗
				this.updatePopups({key: 'isRegistering', value: true})
			},
			...mapActions([
				'update', 'updatePopups'
			])
		},
		computed: {
			...mapState({
				// 登录弹窗
				isLogining: state => state.popups.isLogining,
				// 注册弹窗
				isRegistering: state => state.popups.isRegistering
			})
		}
	}
</script>
<style>
	.serverError {
		color: rgb(255, 0, 0);
	}
</style>
