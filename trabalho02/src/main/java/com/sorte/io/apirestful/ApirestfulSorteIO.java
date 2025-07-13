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
            new Giveaway("Mitsubishi Eclipse 95", "O clássico esportivo dos anos 90!", 30_000.0, 80, "https://img.olx.com.br/images/93/936468579565404.webp", user1),
            new Giveaway("Honda Civic Type R", "O hot hatch mais famoso!", 50_000.0, 70, "https://cbautoshonda.com.br/wp-content/uploads/2024/09/novo-type-_1_230616_4907-1024x683.jpg", user2),
            new Giveaway("BMW M3", "A lenda alemã do desempenho!", 90_000.0, 60, "https://cdn.autopapo.com.br/box/uploads/2021/05/24134628/bmw_m3_compact_1-732x488.jpg", user3),
            new Giveaway("Peugeot 308", "Compacto europeu estiloso!", 40_000.0, 90, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2022_-_Peugeot_308_III_%28C%29_-_121.jpg/1200px-2022_-_Peugeot_308_III_%28C%29_-_121.jpg", user1),
            new Giveaway("Patek Philippe Aquanaut", "O relógio mais sofisticado!", 100_000.0, 30, "https://swisswatches-magazine.com/uploads/2023/11/patek-philippe-5261R-001-rosegold-titlepicture-new.jpg", user2),
            new Giveaway("Rolex Submariner", "O relógio de luxo icônico!", 70_000.0, 40, "https://static.wixstatic.com/media/c3c72e_2a85327f58034fb8a7815d8480499b70~mv2.jpeg/v1/fill/w_980,h_1306,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c3c72e_2a85327f58034fb8a7815d8480499b70~mv2.jpeg", user3),
            new Giveaway("Hublot Big Bang", "Design ousado e moderno!", 80_000.0, 35, "https://swisswatchtrader.co.uk/cdn/shop/products/hublot-big-bang-unico-411nx1170rx-2019-668907_1200x.jpg?v=1708579668", user1),
            new Giveaway("Viagem para o Havaí", "Curta praias paradisíacas!", 50_000.0, 50, "https://www.timeturismo.com.br/imagens/produtos/img_g/Pacote-para-Aloha-Havai---Honolulu--Maui-e-Big-Island-1059.jpg", user2),
            new Giveaway("Curso de paraquedismo", "Uma experiência radical inesquecível!", 8_000.0, 100, "https://www.culturado.com.br/wp-content/uploads/2019/07/curso-paraquedismo.png", user3),
            new Giveaway("MacBook Pro M4", "Alta performance para profissionais!", 30_000.0, 90, "https://www.notebookcheck.info/fileadmin/Notebooks/Apple/MacBook_Pro_14_2024_M4/IMG_7747.JPG", user1),
            new Giveaway("Apple Watch Ultra 2", "O smartwatch mais avançado!", 7_000.0, 150, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-digitalmat-gallery-1-202309?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1695088523284", user2),
            new Giveaway("iPhone 16 Pro", "O mais novo topo de linha!", 12_000.0, 130, "https://hips.hearstapps.com/hmg-prod/images/iphone-16-pro-review-lead-2-2-2-2-2-672513c8909a0.jpeg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*", user3),
            new Giveaway("Mazda Miata 95", "O roadster mais divertido!", 25_000.0, 80, "https://mir-s3-cdn-cf.behance.net/project_modules/1400/62448826170265.56350a593895c.jpg", user1),
            new Giveaway("Lancer Evolution", "Máquina japonesa lendária!", 60_000.0, 70, "https://cdn.motor1.com/images/mgl/6EEZG/s1/2015-6098442015-mitsubishi-lancer-evolution-final-edition1.jpg", user2),
            new Giveaway("Mercedes C63 AMG", "Luxo e potência em um só carro!", 100_000.0, 50, "https://cdn.motor1.com/images/mgl/y22rYY/s1/2024-mercedes-amg-c63-s-e-performance-exterior-front-quarter.jpg", user3),
            new Giveaway("Viagem para Itália", "História, arte e gastronomia!", 40_000.0, 60, "https://midias-turismo.eurodicas.com.br/wp-content/uploads/2025/03/quanto-custa-viajar-para-italia-1.jpg.webp", user1),
            new Giveaway("RTX 5090", "A placa de vídeo mais potente!", 15_000.0, 120, "https://www.flowgames.gg/wp-content/uploads/2024/09/hAcZNwUpeQQAsWfS7LZ4DC.jpg", user3),
            new Giveaway("Audi A3 Sportback", "Estilo e tecnologia alemã!", 80_000.0, 60, "https://cdn.motor1.com/images/mgl/Wx2X6/s1/2020-audi-a3-sportback.webp", user1),
            new Giveaway("Chevette preparado para drift", "Divirta-se nas pistas!", 35_000.0, 90, "https://www.canaldapeca.com.br/blog/wp-content/uploads/2018/08/drif-chevette.jpg", user2),
            new Giveaway("Jaqueta Louis Vuitton", "Estilo de alto luxo!", 15_000.0, 150, "https://dcdn-us.mitiendanube.com/stores/002/304/820/products/site-1431-6acc07eea1bde4c7c116932403112227-1024-1024.png", user3),
            new Giveaway("Monitor 4K", "Qualidade de imagem incrível!", 4_000.0, 180, "https://cdn.thewirecutter.com/wp-content/media/2025/06/BEST-4K-MONITORS-5554.jpg?auto=webp&quality=75&width=1024", user2),
            new Giveaway("Adidas Adi2000 x Bad Bunny", "Tênis exclusivo para colecionadores!", 3_000.0, 200, "https://droper-media.us-southeast-1.linodeobjects.com/271202317542154.webp", user3)
        ));

        Collections.shuffle(giveaways);

        giveawayRepository.saveAll(giveaways);
    }
}
