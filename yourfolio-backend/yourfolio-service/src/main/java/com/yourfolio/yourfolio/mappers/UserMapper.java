package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.UserEntity;
import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source="password", target="password", qualifiedByName = "encryptPassword")
    UserEntity toEntity(UserSaveDTO saveDto);

    UserDTO toDto(UserEntity entity);

    @Named("encryptPassword")
    default String encryptPassword(String password){
        return "{bcrypt}"+ BCrypt.hashpw(password, BCrypt.gensalt(12));
    }
}
