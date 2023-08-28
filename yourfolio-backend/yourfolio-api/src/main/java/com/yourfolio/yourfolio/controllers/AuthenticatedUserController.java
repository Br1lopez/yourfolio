package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.UserDTO;
import com.yourfolio.yourfolio.dtos.UserSaveDTO;
import com.yourfolio.yourfolio.exceptions.LoginNeededException;
import com.yourfolio.yourfolio.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class AuthenticatedUserController {

    private final UserService userService;

//todo: administrar error de usuario repetido
@CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserSaveDTO userSaveDTO, Authentication authentication){
        return new ResponseEntity<>(userService.registerUser(userSaveDTO), HttpStatus.CREATED);
    }

    @GetMapping("/portfolios")
    public ResponseEntity<List<ElementDTO>> getAuthenticatedUserPortfolios(Authentication authentication) throws LoginNeededException {
    if (authentication == null)
        throw new LoginNeededException();
    else
        return new ResponseEntity<>(userService.getUserPortfolios(authentication.getName()), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<UserDTO> getAuthenticatedUserInfo(Authentication authentication)  {
        if (authentication == null)
           return new ResponseEntity<>(UserDTO.builder().build(), HttpStatus.OK);

        else
            return new ResponseEntity<>(userService.getUserByEmail(authentication.getName()), HttpStatus.OK);
    }


}
