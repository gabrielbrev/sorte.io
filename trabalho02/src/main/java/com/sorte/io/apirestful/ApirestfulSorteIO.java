package com.sorte.io.apirestful;

import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.repository.GiveawayRepository;
import com.sorte.io.apirestful.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
public class ApirestfulSorteIO implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GiveawayRepository giveawayRepository;

    public ApirestfulSorteIO(UserRepository userRepository, GiveawayRepository giveawayRepository) {
        this.userRepository = userRepository;
        this.giveawayRepository = giveawayRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(ApirestfulSorteIO.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<User> users = new ArrayList<>(List.of(new User("Gabriel", "gabriel@email.com", "12345678"), new User("Joao", "joao@email.com", "12345678"), new User("Maria", "maria@email.com", "12345678")));

        userRepository.saveAll(users);

        User user1 = users.get(0);
        User user2 = users.get(1);
        User user3 = users.get(2);

        List<Giveaway> giveaways = new ArrayList<>(List.of(
            new Giveaway("Mitsubishi Eclipse 95", "O clássico esportivo dos anos 90!", 2.50, 500_000, "https://img.olx.com.br/images/93/936468579565404.webp", user1),
            new Giveaway("Honda Civic Type R", "O hot hatch mais famoso!", 3.00, 400_000, "https://cbautoshonda.com.br/wp-content/uploads/2024/09/novo-type-_1_230616_4907-1024x683.jpg", user2),
            new Giveaway("BMW M3", "A lenda alemã do desempenho!", 4.00, 350_000, "https://cdn.autopapo.com.br/box/uploads/2021/05/24134628/bmw_m3_compact_1-732x488.jpg", user3),
            new Giveaway("Peugeot 308", "Compacto europeu estiloso!", 1.50, 700_000, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2022_-_Peugeot_308_III_%28C%29_-_121.jpg/1200px-2022_-_Peugeot_308_III_%28C%29_-_121.jpg", user1),
            new Giveaway("Patek Philippe Aquanaut", "O relógio mais sofisticado!", 5.00, 150_000, "https://swisswatches-magazine.com/uploads/2023/11/patek-philippe-5261R-001-rosegold-titlepicture-new.jpg", user2),
            new Giveaway("Rolex Submariner", "O relógio de luxo icônico!", 4.50, 200_000, "https://static.wixstatic.com/media/c3c72e_2a85327f58034fb8a7815d8480499b70~mv2.jpeg/v1/fill/w_980,h_1306,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c3c72e_2a85327f58034fb8a7815d8480499b70~mv2.jpeg", user3),
            new Giveaway("Hublot Big Bang", "Design ousado e moderno!", 4.00, 250_000, "https://swisswatchtrader.co.uk/cdn/shop/products/hublot-big-bang-unico-411nx1170rx-2019-668907_1200x.jpg?v=1708579668", user1),
            new Giveaway("MacBook Pro M4", "Alta performance para profissionais!", 3.50, 600_000, "https://www.notebookcheck.info/fileadmin/Notebooks/Apple/MacBook_Pro_14_2024_M4/IMG_7747.JPG", user1),
            new Giveaway("Apple Watch Ultra 2", "O smartwatch mais avançado!", 2.00, 800_000, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-digitalmat-gallery-1-202309?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1695088523284", user2),
            new Giveaway("iPhone 16 Pro", "O mais novo topo de linha!", 3.00, 700_000, "https://hips.hearstapps.com/hmg-prod/images/iphone-16-pro-review-lead-2-2-2-2-2-672513c8909a0.jpeg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*", user3),
            new Giveaway("Mazda Miata 95", "O roadster mais divertido!", 2.50, 500_000, "https://mir-s3-cdn-cf.behance.net/project_modules/1400/62448826170265.56350a593895c.jpg", user1),
            new Giveaway("Lancer Evolution", "Máquina japonesa lendária!", 3.50, 400_000, "https://cdn.motor1.com/images/mgl/6EEZG/s1/2015-6098442015-mitsubishi-lancer-evolution-final-edition1.jpg", user2),
            new Giveaway("Mercedes C63 AMG", "Luxo e potência em um só carro!", 5.00, 300_000, "https://cdn.motor1.com/images/mgl/y22rYY/s1/2024-mercedes-amg-c63-s-e-performance-exterior-front-quarter.jpg", user3),
            new Giveaway("RTX 5090", "A placa de vídeo mais potente!", 3.00, 600_000, "https://www.flowgames.gg/wp-content/uploads/2024/09/hAcZNwUpeQQAsWfS7LZ4DC.jpg", user3),
            new Giveaway("Audi A3 Sportback", "Estilo e tecnologia alemã!", 4.00, 350_000, "https://cdn.motor1.com/images/mgl/Wx2X6/s1/2020-audi-a3-sportback.webp", user1),
            new Giveaway("Jaqueta Louis Vuitton", "Estilo de alto luxo!", 2.00, 900_000, "https://dcdn-us.mitiendanube.com/stores/002/304/820/products/site-1431-6acc07eea1bde4c7c116932403112227-1024-1024.png", user3),
            new Giveaway("Monitor 4K", "Qualidade de imagem incrível!", 0.50, 1_000_000, "https://cdn.thewirecutter.com/wp-content/media/2025/06/BEST-4K-MONITORS-5554.jpg?auto=webp&quality=75&width=1024", user2),
            new Giveaway("Adidas Adi2000 x Bad Bunny", "Tênis exclusivo para colecionadores!", 1.00, 950_000, "https://droper-media.us-southeast-1.linodeobjects.com/271202317542154.webp", user3),
            new Giveaway("Volkswagen Golf GTI", "Esportivo prático e elegante!", 3.00, 500_000, "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volkswagen/Golf-GTI/12276/1748332139801/front-view-118.jpg", user1),
            new Giveaway("Mini Cooper S", "Estilo e diversão urbana!", 3.50, 450_000, "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/07/MINI-Cooper-S-2025-14.jpg", user2),
            new Giveaway("Honda HR-V Touring", "O SUV queridinho das famílias!", 2.50, 700_000, "https://cdn.motor1.com/images/mgl/nAylgy/s1/honda-hr-v-touring-2023.jpg", user3),
            new Giveaway("Yamaha MT-09", "A naked esportiva para o dia a dia!", 4.00, 300_000, "https://s2-autoesporte.glbimg.com/7h-iVB_0ckK7L98WhzM3zq-ncV8=/0x0:620x413/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/P/M/5uCxLgTqWZ7qiAfksMwQ/2019-08-06-img-7469.jpg", user1),
            new Giveaway("Fiat Toro Volcano", "A picape moderna e versátil!", 3.00, 550_000, "https://cdn.motor1.com/images/mgl/W8MYOO/501:0:2999:2250/fiat-toro-volcano-t270-2024.webp", user2),
            new Giveaway("iPad Pro + Apple Pencil", "Ferramenta criativa definitiva!", 2.00, 800_000, "https://theflourishplanner.com/cdn/shop/articles/Screenshot_2023-11-03_084610.png?v=1698982010", user3),
            new Giveaway("Galaxy S24 Ultra", "Fotografia e performance no bolso!", 3.00, 700_000, "https://images.samsung.com/is/image/samsung/assets/br/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg", user1),
            new Giveaway("PlayStation 5 com VR2", "A imersão completa nos games!", 2.50, 900_000, "https://servelec.pt/thumb/&w=1032&h=1032&far=1&src=/Imgs/produtos/011/91/14/PS5VR2_2.jpg", user2),
            new Giveaway("PC Gamer RTX 4070", "Para jogar tudo no ultra!", 4.00, 500_000, "https://cdn.awsli.com.br/2500x2500/165/165970/produto/232448011/cpucoreifgbnvmetbwatercoolerrtx-899376-mlb71536406016_092023--1--ei30v5rbyz.jpg", user3),
            new Giveaway("Canon EOS R10", "Para começar no mundo mirrorless!", 2.00, 850_000, "https://i.ytimg.com/vi/QCgJfsHV2GU/maxresdefault.jpg", user1),
            new Giveaway("Tênis Nike Air Max", "Para destacar o estilo!", 1.00, 950_000, "https://cdn.awsli.com.br/2500x2500/644/644155/produto/246576009/img_5258-b8mhn9shsy.jpeg", user1),
            new Giveaway("Jaqueta The North Face", "Pronta para aventuras!", 2.00, 800_000, "https://tcheinverno.vtexassets.com/arquivos/ids/177577/jaqueta-north-face-inverno-masculina-down-belleview.png?v=638485558018600000", user2),
            new Giveaway("Óculos Ray-Ban", "Clássico atemporal!", 0.70, 1_000_000, "https://images.ray-ban.com/is/image/RayBan/805289602057__STD__shad__fr.png", user3),
            new Giveaway("Kit de churrasco Tramontina", "Para o mestre da grelha!", 0.90, 950_000, "https://d29s41sq4kxt1n.cloudfront.net/Custom/Content/Products/57/55/57556_kit-para-churrasco-tramontina-com-talheres-jumbo-em-aco-inox-69123_l1_638240564322710273.webp", user1),
            new Giveaway("Bicicleta elétrica urbana", "Sustentável e prática!", 3.50, 400_000, "https://semexe.com/blog/wp-content/uploads/2021/09/Captura-de-Tela-2021-09-28-às-11.25.17.png", user2)
        ));

//        Collections.shuffle(giveaways);

        giveawayRepository.saveAll(giveaways);
    }
}
