<?php
/**
 * Statik sayfa şablonu (page.php)
 *
 * @package GameX_WP
 */

get_header(); ?>

	<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) :
			the_post();
			?>

			<article id="post-<?php the_ID(); ?>" <?php post_class('blog-post item-post static_page'); ?>>
				
				<header class="entry-header">
					<?php the_title( '<h1 class="post-title">', '</h1>' ); ?>
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
				</div></article><?php
			// Sayfalarda da yorumların açık olmasına izin veriliyorsa göster
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // Döngü sonu.
		?>

	</main><?php
get_footer();