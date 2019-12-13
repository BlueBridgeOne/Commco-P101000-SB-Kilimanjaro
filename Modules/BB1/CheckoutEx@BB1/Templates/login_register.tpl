{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<style>
	.navbar,.footer-container,.footer-strapline,.footer-policies{display:none;}
	.footer{border-style:none!important;}
</style>
<section class="login-register">
	<div class="login-register-background"></div>
	<div class="login-register-foreground">
		<h1 class="login-title">{{translate 'Customer Portal'}}</h1>
		<div data-view="Messages"></div>

		<div>

			<div class="login-register-wrapper-column-login">
				<div class="login-register-wrapper-login" data-view="Login"></div>
			</div>


		</div>
	</div>
</section>



{{!----
Use the following context variables when customizing this template:

	showRegister (Boolean)
	showCheckoutAsGuest (Boolean)
	showLogin (Boolean)
	showRegisterOrGuest (Boolean)

----}}