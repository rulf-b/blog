<?php
/**
 * Yorum şablonu
 *
 * @package GameX_WP
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="blog-post-comments comments-area">

    <?php if ( have_comments() ) : ?>
        <div class="title-wrap comments-title">
            <h3>
                <?php
                $comment_count = get_comments_number();
                if ( '1' === $comment_count ) {
                    printf( esc_html__( '1 Yorum', 'gamex-wp' ) );
                } else {
                    printf( esc_html( _nx( '%1$s Yorum', '%1$s Yorum', $comment_count, 'comments title', 'gamex-wp' ) ), number_format_i18n( $comment_count ) );
                }
                ?>
            </h3>
        </div>

        <ol class="comment-list">
            <?php
            wp_list_comments( array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 45,
            ) );
            ?>
        </ol>

        <?php the_comments_navigation(); ?>

    <?php endif; ?>

    <?php
    if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
    ?>
        <p class="no-comments"><?php esc_html_e( 'Yoruma kapalı.', 'gamex-wp' ); ?></p>
    <?php endif; ?>

    <?php
    comment_form(array(
        'title_reply' => 'Bir Yorum Bırakın',
        'title_reply_to' => '%s adlı kişiye yanıt ver',
        'cancel_reply_link' => 'Yanıtı İptal Et',
        'label_submit' => 'Yorumu Gönder'
    ));
    ?>

</div>