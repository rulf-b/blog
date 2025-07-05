<?php
/**
 * Özel Ana Sayfa Şablonu (front-page.php)
 *
 * @package GameX_WP
 */

get_header(); ?>

<div class="row" id="featured-wrapper">
    <section class="featured-posts" id="featured-posts-1">
        <div class="title-wrap">
            <h3>Öne Çıkanlar</h3>
        </div>
        <div class="widget-content">
            <ul class="grid-big">
                <?php
                // "special" KATEGORİSİNDEN 4 YAZI ÇEKMEK İÇİN ÖZEL SORGUMUZ
                $args_special = array(
                    'posts_per_page'      => 4,
                    'category_name'       => 'special', // DİKKAT: Bu kategori 'kısa-ismi' sitede olmalı
                    'ignore_sticky_posts' => 1,
                );
                $query_special = new WP_Query( $args_special );
                if ( $query_special->have_posts() ) :
                    while ( $query_special->have_posts() ) : $query_special->the_post();
                ?>
                    <li class="feat-item item-big">
                        <div class="feat-inner">
                            <a class="post-image-link" href="<?php the_permalink(); ?>">
                                <?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium_large'); } ?>
                            </a>
                            <div class="post-info-wrap">
                                <div class="post-info">
                                    <h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                </div>
                            </div>
                        </div>
                    </li>
                <?php
                    endwhile;
                    wp_reset_postdata(); // Sorguyu sıfırla
                else :
                    echo '<p>Bu bölümde gösterilecek yazı bulunamadı.</p>';
                endif;
                ?>
            </ul>
        </div>
    </section>
</div>

<div class="row" id="hot-wrapper">
    <section id="hot-section">
         <div class="title-wrap">
            <h3>Sıcak Gelişmeler</h3>
        </div>
        <div class="widget-content show-hot">
             <ul class="hot-posts">
                <?php
                // "hot-posts" KATEGORİSİNDEN 4 YAZI ÇEKMEK İÇİN ÖZEL SORGUMUZ
                $args_hot = array(
                    'posts_per_page'      => 4,
                    'category_name'       => 'hot-posts', // DİKKAT: Bu kategori 'kısa-ismi' sitede olmalı
                    'ignore_sticky_posts' => 1,
                );
                $query_hot = new WP_Query( $args_hot );
                if ( $query_hot->have_posts() ) :
                    $post_counter = 0;
                    while ( $query_hot->have_posts() ) : $query_hot->the_post();
                ?>
                    <li class="hot-item item-<?php echo $post_counter; ?>">
                        <div class="hot-item-inner">
                            <a class="post-image-link" href="<?php the_permalink(); ?>">
                               <?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium_large'); } ?>
                            </a>
                            <div class="post-info">
                                <h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <div class="post-meta">
                                    <span class="post-date"><?php echo get_the_date('j F Y'); ?></span>
                                </div>
                            </div>
                        </div>
                    </li>
                <?php
                    $post_counter++;
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </ul>
        </div>
    </section>
</div>

<div class="row" id="carousel-wrapper">
    <section id="carousel-section" class="show-slide">
        <div class="title-wrap">
            <h3>Carousel</h3>
        </div>
        <div class="widget-content">
            <ul class="slide-posts owl-carousel">
                <?php
                // "carousel" KATEGORİSİNDEN 12 YAZI ÇEKMEK İÇİN ÖZEL SORGUMUZ
                $args_carousel = array(
                    'posts_per_page'      => 12,
                    'category_name'       => 'carousel', // DİKKAT: Bu kategori 'kısa-ismi' sitede olmalı
                    'ignore_sticky_posts' => 1,
                );
                $query_carousel = new WP_Query( $args_carousel );
                if ( $query_carousel->have_posts() ) :
                    while ( $query_carousel->have_posts() ) : $query_carousel->the_post();
                ?>
                    <li class="car-item">
                         <div class="car-item-inner">
                            <a class="post-image-link" href="<?php the_permalink(); ?>">
                                <?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium'); } ?>
                            </a>
                            <div class="post-info-wrap">
                                <div class="post-info">
                                    <h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                </div>
                            </div>
                        </div>
                    </li>
                <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </ul>
        </div>
    </section>
</div>

<div id="main-wrapper">
    <div class="title-wrap">
        <h3>Son Yazılar</h3>
    </div>
    <?php
    // Ana blog döngüsü, sayfalama ile birlikte
    $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
    $main_args = array(
        'post_type' => 'post',
        'paged'     => $paged,
    );
    $main_query = new WP_Query( $main_args );

    if ( $main_query->have_posts() ) :
        while ( $main_query->have_posts() ) : $main_query->the_post();
    ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('blog-post index-post'); ?>>
            <div class="post-image-wrap">
                <a class="post-image-link" href="<?php the_permalink(); ?>">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <?php the_post_thumbnail('large', array('class' => 'post-thumb')); ?>
                    <?php else : ?>
                        <img class="post-thumb" src="<?php echo get_template_directory_uri(); ?>/images/nth.png" alt="<?php the_title_attribute(); ?>">
                    <?php endif; ?>
                </a>
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
    <?php
        endwhile;
        // Sayfalama
        the_posts_pagination( array(
            'prev_text' => '&laquo; Önceki',
            'next_text' => 'Sonraki &raquo;',
        ) );
        wp_reset_postdata();
    else:
        echo '<p>Yazı bulunamadı.</p>';
    endif;
    ?>
</div>

<?php get_footer(); ?>