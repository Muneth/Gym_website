<?php
     include('header.php');
?>

<main id="coaching">

        <div id="home-inscr">
            <div class="ins-h2">
                <h2>NOUS ÉCRIRE...</h2>
                <div class="bottom-line"></div>
            </div>
        </div>  
        <!-- PERSONAL DETAILS -->

    <section id="home-details">
        <form>
            <div class="detail">
                <div class="form-a">
                    <p>
                        <label for="nom">Nom</label>
                        <input type="text" name="nom" id="nom" placeholder="Entre votre nom">
                    </p>

                    <p>
                        <label for="tel">Telephone</label>
                        <input type="tel" name="tel" id="tel" placeholder="00 00 00 00 00">
                    </p>

                    <p>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="@">
                    </p>

                    <p>
                        <label for="address">Address</label>
                        <input type="street" class="form-control inputStreet" id="autocomplete" placeholder="Address">
                    <p>

                    <p>
                        <label for="message">Message</label>
                        <textarea name="message" id="message" placeholder="Message" cols="30" rows="5"></textarea>
                    </p>
                </div>
            </div> 
        </form>
        <button class="btn-form-home" id="sendDetails" type="submit">ENVOYER</button>
        <div id="data"></div>
    </section>

</main>

<?php
     include('footer.php');
?>