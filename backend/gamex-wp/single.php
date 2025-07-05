<?php
/**
 * Tekil yazı şablonu (single.php)
 *
 * @package GameX_WP
 */

get_header(); ?>

	<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) :
			the_post();
			?>

			<article id="post-<?php the_ID(); ?>" <?php post_class('blog-post item-post'); ?>>
				
				<header class="entry-header">
					<?php the_title( '<h1 class="post-title">', '</h1>' ); ?>

					<div class="post-meta">
						<span class="post-author"><?php the_author(); ?></span>
						<span class="post-date"><?php echo get_the_date(); ?></span>
						<span class="post-comment-link"><?php comments_popup_link( 'Yorum Yok', '1 Yorum', '% Yorum', 'comments-link', ''); ?></span>
					</div>
				</header><div class="post-body post-content">
					<?php
					the_content();

					wp_link_pages(
						array(
							'before' => '<div class="page-links">' . esc_html__( 'Sayfalar:', 'gamex-wp' ),
							'after'  => '</div>',
						)
					);
					?>
				</div><footer class="post-footer">
					<div class="post-labels">
						<span><?php esc_html_e( 'Kategoriler:', 'gamex-wp' ); ?></span>
						<div class="label-head Label">
							<?php the_category( ' ' ); ?>
						</div>
					</div>
					
					<?php if ( get_the_author_meta( 'description' ) ) : ?>
						<div class="about-author">
							<div class="avatar-container">
								<?php echo get_avatar( get_the_author_meta( 'user_email' ), 80, '', '', array('class' => 'author-avatar') ); ?>
							</div>
							<h3 class="author-name">
								<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" rel="author">
									<?php the_author(); ?>
								</a>
							</h3>
							<span class="author-description"><?php the_author_meta( 'description' ); ?></span>
						</div>
					<?php endif; ?>

					<?php
					the_post_navigation(
						array(
							'prev_text' => '<div class="post-nav-inner"><span>' . esc_html__( 'Önceki Yazı', 'gamex-wp' ) . '</span><p>%title</p></div>',
							'next_text' => '<div class="post-nav-inner"><span>' . esc_html__( 'Sonraki Yazı', 'gamex-wp' ) . '</span><p>%title</p></div>',
						)
					);
					?>
				</footer></article><?php
			// Yorumlar bölümünü çağırıyoruz.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // Döngü sonu.
		?>

	</main><?php
get_footer();