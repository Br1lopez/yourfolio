package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.UserEntity;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import com.yourfolio.yourfolio.mappers.ElementMapper;
import com.yourfolio.yourfolio.mappers.UserMapper;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import com.yourfolio.yourfolio.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final ElementRepository elementRepository;
    private final ElementMapper elementMapper;

    public UserDTO registerUser(UserSaveDTO userSaveDTO) {
        return userMapper.toDto(
                userRepository.save(
                        userMapper.toEntity(userSaveDTO)));
    }

    public List<ElementDTO> getUserPortfolios(Integer userId) {
        return elementMapper.toDtoList(elementRepository.findByUser_IdAndType_Id(userId, "portfolio"));
    }

    public List<ElementDTO> getUserPortfolios(String userEmail) {
        return elementMapper.toDtoList(elementRepository.findByUser_EmailAndType_Id(userEmail, "portfolio"));
    }
}
