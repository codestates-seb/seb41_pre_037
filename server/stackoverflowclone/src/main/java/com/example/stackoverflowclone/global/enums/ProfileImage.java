package com.example.stackoverflowclone.global.enums;

import lombok.Getter;

public enum ProfileImage {

    BASIC_IMAGE_ONE(1,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPEUr8gxMDCgTW4JYqx69Xs0mn_SwDpFBlyHMyBH_O3WV18nObvFAO8Zi0Ehvu30mqPhSWlYEecVxvSJMGwGERS2fK1gQ=w1920-h921"),
    BASIC_IMAGE_TWO(2,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gOtBngM6igLV_5Gi86DYVCKWPOuuBgzUxZiiu2DZVYZdi1T_CpI2-xBeHbODJMwMymHxzTtCtLwlbTsvuCZj1dbg5fWkw=w1920-h921"),
    BASIC_IMAGE_THREE(3,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gOg7R_zu1d5ondnz2mF9Mfs5POsyaYwY0bpBfzQmTCA5iNpVhU3rycNjteK9RZKX0_dsQLXn1AGkA_MtfZJKeSJ03vOJg=w1000-h921"),
    BASIC_IMAGE_FOUR(4,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPE5xpI0-lxEqtHYRm-avwUL1X2y8HUz_CtZoT2afckhm77Y_hZfo5N7xB6VP2bDxsiIT4DcFRwe8wSc5-y9BFHYfhe=w1000-h921"),
    BASIC_IMAGE_FIVE(5,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPEZNW9ORtC6bMAw54VDZFQ3IaDPrGVWFKi18kERIrAxuE8N8MmbZhtol2Ujxvyrz21Ows7-0_4P8cz_sJlXYPvVu4z=w1920-h921"),
    BASIC_IMAGE_SIX(6,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPl1BRcwUBJePKvZ9KXt9OmrtzuXJ0Vz5OS3BleIFoj--OcaQI8PCOIutsUO3m0ldLotm0Y8fOpsgI-yLGYwyxyZVue=w1000-h921"),
    BASIC_IMAGE_SEVEN(7,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gOUcWn-HIk4JoOiMBxVqMc458drW7579JOqVcfR3Nq7eHs2WZV1URKdSy7iAEnrteP-19yw4B7xAAphkiPKu4fAez8j3g=w1000-h921"),
    BASIC_IMAGE_EIGHT(8,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gMY6Ju7pO_FZp5hyfYdjKljdMAFlS5nCtbnvfJfXXqG52kH_WvYSqNsi7ClGgYVgmK8Gav_XdM_tCc5liRtQD8bZq4Ryg=w1920-h921"),
    BASIC_IMAGE_NIGHT(9,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gP3vIemuwNCa2gLq8QFxJ0mvEUyH90NCzzCdEh6zkRFmQvF6_MHHo8N46VTTP58ovW3ikNSXN281NhTcbDaBfESUl6eUw=w1000-h921"),
    BASIC_IMAGE_TEN(10,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gMzNhh9XTiXBHg_K4sHjKxhNVZTpihvtXFyGa_pR2L3j2ymHy6w9uDu5Pqmjo_-PPl40kIJENWVqGGfVE7-o1vMxMS0Zg=w1000-h921"),
    BASIC_IMAGE_ELEVEN(11,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gOnvAfzDjdq54wfaQ3aQnYMNbfCsFwZVvyBIxEzKYw7LUtT7SnlxkIyZnkXyxrN2y8N5CuXVCLdNdloEMYYl7PPTBotWA=w1000-h921"),
    BASIC_IMAGE_TWELVE(12,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gOeqDCgTYyD4_NlylK0EE-y1Fn0lj364mopuRJbuN4JvWP2eQGBJt6Ygv48nrlnHiuiq2Dkgz3ep7XILzUgT_lVAN1VpA=w1000-h921"),
    BASIC_IMAGE_THIRTEEN(13,"https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPKgEG4sHNVV90PQrE5jn37skBOV5Qp7M3czg2sShhPYx46ybBb0KhQ37mcxGl6H6E_1xVdAhna7aAJGi8qp1oYGCWMMw=w1000-h921"),
    BASIC_IMAGE_FOURTEEN(14, "https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gNXn3Qy3cjHid6lgXk6cT9J78rm98pYCgumlTWAHENmA_Q3ujH3MxEbMBYp_lHBLM8rpIU51BtZnzaIKi3CiEsrqcDKQA=w1000-h921");

    @Getter
    int index;
    @Getter
    private String url;

    ProfileImage(int index, String url) {
        this.index = index;
        this.url = url;
    }
}
