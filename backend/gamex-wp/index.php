<?php
/**
 * Ana şablon dosyası.
 *
 * @package GameX_WP
 */

get_header(); ?>

<?php if ( have_posts() ) : ?>

    <?php while ( have_posts() ) : the_post(); ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class('blog-post index-post'); ?>>
            <div class="post-image-wrap">
                <a class="post-image-link" href="<?php the_permalink(); ?>">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <?php the_post_thumbnail('large', array('class' => 'post-thumb')); ?>
                    <?php else : ?>
                        <img class="post-thumb" src="<?php echo get_template_directory_uri(); ?>/images/nth.png" alt="<?php the_title_attribute(); ?>">
                    <?php endif; ?>
                </a>
                <?php
                $categories = get_the_category();
                if ( ! empty( $categories ) ) {
                    echo '<span class="post-tag"><a href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a></span>';
                }
                ?>
            </div>
            <div class="post-info">
                <header class="entry-header">
                    <?php the_title( sprintf( '<h2 class="post-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
                </header>

                <div class="post-meta">
                    <span class="post-author"><?php the_author(); ?></span>
                    <span class="post-date"><?php echo get_the_date(); ?></span>
                </div>

                <div class="post-snippet">
                    <?php the_excerpt(); ?>
                </div>

                <a class="read-more" href="<?php the_permalink(); ?>">Devamını Oku</a>
            </div>
        </article>

    <?php endwhile; ?>

    <?php
    // Sayfalama
    the_posts_pagination( array(
        'prev_text' => '&laquo; Önceki',
        'next_text' => 'Sonraki &raquo;',
    ) );
    ?>

<?php else : ?>

    <p>İçerik bulunamadı.</p>

<?php endif; ?>

<?php get_footer(); ?>