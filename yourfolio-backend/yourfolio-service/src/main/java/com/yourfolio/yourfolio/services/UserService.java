package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.UserEntity;
import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import com.yourfolio.yourfolio.mappers.UserMapper;
import com.yourfolio.yourfolio.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDTO registerUser(UserSaveDTO userSaveDTO) {
        System.out.println(userSaveDTO);
        return(userMapper.toDto(
                userRepository.save(
                        userMapper.toEntity(userSaveDTO))));
    }
}
