package com.example.stackoverflowclone.global.enums;

import lombok.Getter;

public enum ProfileImage {

    BASIC_IMAGE_ONE(1,"https://user-images.githubusercontent.com/95069395/217765427-24fda748-3525-4d8a-abdb-88dc660020fc.png"),
    BASIC_IMAGE_TWO(2,"https://user-images.githubusercontent.com/95069395/217765430-f9f54436-ae18-47ac-87c4-b0ea9369547a.png"),
    BASIC_IMAGE_THREE(3,"https://user-images.githubusercontent.com/95069395/217765437-5eb0766a-139b-4d74-8ea7-f13fb511fb6b.png"),
    BASIC_IMAGE_FOUR(4,"https://user-images.githubusercontent.com/95069395/217765442-ddf39075-30c9-45a1-9d55-806b35c9c991.png"),
    BASIC_IMAGE_FIVE(5,"https://user-images.githubusercontent.com/95069395/217765447-d8b3c96e-42d2-4b4d-9660-df536e82a48e.png"),
    BASIC_IMAGE_SIX(6,"https://user-images.githubusercontent.com/95069395/217765450-c1e29534-8974-45c3-ba3d-0d98dc3ac4c7.png"),
    BASIC_IMAGE_SEVEN(7,"https://user-images.githubusercontent.com/95069395/217765456-26f2ac03-91a6-4b4d-a14c-ab6275d49022.png"),
    BASIC_IMAGE_EIGHT(8,"https://user-images.githubusercontent.com/95069395/217765459-d95c0338-5ced-4689-9afb-61d917e0c4ad.png"),
    BASIC_IMAGE_NIGHT(9,"https://user-images.githubusercontent.com/95069395/217765462-8b65713a-f436-405e-812d-c7b906bcb8e8.png"),
    BASIC_IMAGE_TEN(10,"https://user-images.githubusercontent.com/95069395/217765465-83f95069-d4be-4418-a7ee-f569b235f665.png"),
    BASIC_IMAGE_ELEVEN(11,"https://user-images.githubusercontent.com/95069395/217765469-2a34827e-f18c-4bca-aa49-ab3c698c46ce.png"),
    BASIC_IMAGE_TWELVE(12,"https://user-images.githubusercontent.com/95069395/217765473-c7044900-f16b-407c-a27e-939c7c8a2e17.png"),
    BASIC_IMAGE_THIRTEEN(13,"https://user-images.githubusercontent.com/95069395/217765476-31afe366-b1d2-4ee8-92f4-7d254a7616d2.png"),
    BASIC_IMAGE_FOURTEEN(14, "https://user-images.githubusercontent.com/95069395/217765478-e9cbd679-d241-4a42-b285-f334b0b22241.png");

    @Getter
    int index;
    @Getter
    private String url;

    ProfileImage(int index, String url) {
        this.index = index;
        this.url = url;
    }
}
