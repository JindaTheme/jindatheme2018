			<footer class="footer">
				<div class="container">
					<div class="row">
						<div class="col-sm-6">
							<img src="<?php echo get_template_directory_uri() ?>/img/jindatheme-logo-black.png" class="footer-logo" alt="<?php bloginfo('name') ?>" />
							<div class="footer-company">
								<p><?php _e('JindaTheme Company Limited', 'jindatheme') ?></p>
								<p><small><?php _e('email', 'jindatheme') ?>: <?php the_field('email', 'option') ?></small></p>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="footer-copyright">
								<p>© 2018 JindaTheme.com</p>
								<p><?php _e('All rights reserved', 'jindatheme') ?></p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>

		<?php wp_footer(); ?>
	</body>
</html>